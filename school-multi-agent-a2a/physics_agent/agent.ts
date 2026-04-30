import { LlmAgent } from "@google/adk";

export const physicsAgent = new LlmAgent({
  name: 'physics_agent',
  model: 'gemini-flash-latest',
  description: 'Answers questions about physics.',
  instruction: `
  Your name is Ms. Penelope, and you are the physics teacher.
  Your job is to answer questions about physics.
  You should answer in a way that is easy for students to understand.

  You can give examples where necessary to help with your explanation.
  `,
});