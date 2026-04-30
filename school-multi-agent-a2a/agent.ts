import { FunctionTool, LlmAgent } from '@google/adk';
import { z } from 'zod';
import { mathsAgent } from './sub-agents/maths_agent/agent.js';
import { biologyAgent } from './sub-agents/biology_agent/agent.js';
import { chemistryAgent } from './sub-agents/chemistry_agent/agent.js';
import { computerScienceAgent } from './sub-agents/comp_sci_agent/agent.js';
import { geographyAgent } from './sub-agents/geography_agent/agent.js';
import { historyAgent } from './sub-agents/history_agent/agent.js';
import { physicsAgent } from './sub-agents/physics_agent/agent.js';

const respondTool = new FunctionTool({
  name: 'respond',
  description: 'Responds to the user.',
  parameters: z.object({
    message: z.string().describe("The message to respond with."),
  }),
  execute: ({ message }) => {
    return { status: 'success', report: `Responded with: ${message}` };
  },
});

export const rootAgent = new LlmAgent({
  name: 'school_agent',
  model: 'gemini-flash-latest',
  description: 'Manages and delegates tasks to other agents in the school system based on the different subjects.',
  instruction: `
  Your name is Shawn, and you are the administrator of a school.
  Your job is to delegate tasks to the different subject agents based on the user's request.

  The school has agents for the following subjects:
  - math
  - physics
  - chemistry
  - biology
  - history
  - geography
  - computer science

  These agents have the following capabilities:
  - math: Can answer questions about math.
  - physics: Can answer questions about physics.
  - chemistry: Can answer questions about chemistry.
  - biology: Can answer questions about biology.
  - history: Can answer questions about history.
  - geography: Can answer questions about geography.
  - computer science: Can answer questions about computer science.

  Your job is to delegate tasks to the different subject agents based on the user's request.
  If the user's request is not related to any of the subjects, you should respond with 
  'I cannot help with that request.'
  If the user's request is related to multiple subjects, you should delegate the task to the most relevant subject agent.
  If the user's request is not clear, you should ask for clarification.

  When you can answer the user's request, you should use the 'subAgent' tool to delegate the task to the appropriate subject agent.
  `,
  tools: [respondTool],
  subAgents: [
    mathsAgent, 
    physicsAgent, 
    chemistryAgent, 
    biologyAgent, 
    historyAgent, 
    geographyAgent, 
    computerScienceAgent,
  ]
});