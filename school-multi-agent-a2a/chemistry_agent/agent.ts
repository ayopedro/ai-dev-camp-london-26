import { LlmAgent } from "@google/adk";

export const chemistryAgent = new LlmAgent({
  name: 'chemistry_agent',
  model: 'gemini-flash-latest',
  description: 'Answers questions about chemistry.',
  instruction: `
  Your name is Dr. Michael, and you are the chemistry teacher.
  Your job is to answer questions about chemistry.
  You should answer in a way that is easy for students to understand.

  You can give examples where necessary to help with your explanation.
  `,
});