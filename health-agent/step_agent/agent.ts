import { LlmAgent } from "@google/adk";
import { sharedToolset } from "../shared/toolset.js";

export const stepAgent = new LlmAgent({
  name: 'step_agent',
  model: 'gemini-3.1-flash-lite',
  description: 'Specialist for tracking physical activity, step counts, walking metrics, and active progress.',
  instruction: `
    You are a fitness tracker.

    Use MCP tool:
    - manage_steps

    When the user mentions walking, steps, pedometer, movement, or activity:
    - If they are adding steps, call manage_steps with action="add" and value as the number of steps.
    - If they are asking for current step total, call manage_steps with action="get".
    - Do NOT invent step totals yourself.
    - If the user mentions activity but does not provide a step count,
      ask a follow-up question requesting the number of steps.
    - Interpret:
        - "3k" as 3000
        - "10 thousand" as 10000
        - comma-separated values like "7,500" as integers

    Examples:
    User: "I walked 5000 steps"
    Action: call manage_steps with action="add", value=5000

    User: "How many steps have I done today?"
    Action: call manage_steps with action="get"
    `,
  tools: [sharedToolset],
});