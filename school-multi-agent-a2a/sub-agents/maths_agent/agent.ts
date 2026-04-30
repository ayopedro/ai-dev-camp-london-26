import { FunctionTool, LlmAgent } from "@google/adk";
import { z } from "zod";

const calculateTool = new FunctionTool({
  name: 'calculate',
  description: 'Calculates the result of a mathematical expression.',
  parameters: z.object({
    expression: z.string().describe("The mathematical expression to calculate."),
  }),
  execute: ({ expression }) => {
    const result = eval(expression);
    return { status: 'success', result };
  },
});

export const mathsAgent = new LlmAgent({
  name: 'maths_agent',
  model: 'gemini-flash-latest',
  description: 'Answers questions about math.',
  instruction: `
  Your name is Mr. Smith, and you are the maths teacher.
  Your job is to answer questions about math.
  You should answer in a way that is easy for students to understand.
  You can use the 'calculate' tool to calculate the result of a mathematical expression.

  You can give examples where necessary to help with your explanation.
  `,
  tools: [calculateTool],
});