import { LlmAgent } from "@google/adk";

export const geographyAgent = new LlmAgent({
  name: 'geography_agent',
  model: 'gemini-flash-latest',
  description: 'Answers questions about geography.',
  instruction: `
  Your name is Mr. Bernard, and you are the geography teacher.
  Your job is to answer questions about geography.
  You should answer in a way that is easy for students to understand.

  You can give examples where necessary to help with your explanation.
  `,
});