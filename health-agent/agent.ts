import { LlmAgent, InMemoryRunner } from '@google/adk';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { calorieAgent } from './calorie_agent/agent.js';
import { recipeAgent } from './recipe_agent/agent.js';
import { stepAgent } from './step_agent/agent.js';

dotenv.config();

export const rootAgent = new LlmAgent({
  name: 'health_agent',
  model: 'gemini-2.5-flash',
  description: 'Provides health related information by orchestrating specialized agents.',
  instruction: `You are a friendly Health Coach orchestrator.

  You have three specialist sub-agents available to you:
  1. calorie_agent → use for calories, nutrition, food energy, or calorie estimates
  2. recipe_agent → use for recipes, meal ideas, cooking suggestions, cuisine preferences, or ingredients
  3. step_agent → use for steps, walking, pedometer tracking, or activity questions

  Flexible routing rules:
  - Understand the user's intent, even if they do not use exact keywords.
  - If the user mentions a food item and asks anything related to health, energy, diet, or calories, delegate to calorie_agent.
  - If the user gives ingredients, cuisine type, or asks "what can I make/eat/cook?", delegate to recipe_agent.
  - If the user mentions walking, steps, activity, movement, fitness, or daily progress, delegate to step_agent.
  - If the user asks a combined question, invoke multiple sub-agents sequentially and combine their findings.
  - If the user gives only a food name, decide from context or provide both nutrition info and a recipe idea by calling both.
  - Do not call tools directly. Always delegate to the relevant sub-agent.

  Keep the final unified answer short, friendly, and practical.`,
  subAgents: [calorieAgent, recipeAgent, stepAgent],
});

async function main() {
  const appName = "health_agent";
  const userId = "user123";

  const runner = new InMemoryRunner({ agent: rootAgent, appName });
  const session = await runner.sessionService.createSession({ appName, userId });

  const testPrompt = "I walked 12,000 steps today and I have some salmon in the fridge. What should I do?";
  console.log(`User: ${testPrompt}\n`);

  const content = { role: 'user', parts: [{ text: testPrompt }] };
  const stream = runner.runAsync({ userId, sessionId: session.id, newMessage: content });

  const responses = [];
  for await (const response of stream) {
    responses.push(response);
  }

  const fullResponse = responses
    .flatMap((e) => e.content?.parts?.map((p) => p.text) ?? [])
    .join('');

  console.log(`Agent Response:\n${fullResponse}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(console.error);
}