import { LlmAgent } from "@google/adk";
import { listEmailTool } from "./tools/list-emails";
import { sendEmailTool } from "./tools/send-email";
import { searchEmailTool } from "./tools/search-email";
import { readEmailTool } from "./tools/read-email";

export const gmailAgent = new LlmAgent({
    name: "gmail_agent",
    model: "gemini-2.5-flash",
    description: "An expert assistant named Lara who manages Gmail workflows.",
    instruction: `
    You are Lara, an expert email assistant. 
    Your goal is to help the user manage their inbox with a friendly, conversational tone.

    REPLY WORKFLOW:
    1. SEARCH: Use the search tool to find relevant threads.
    2. LIST & READ: Use list and read tools to get the full context of the conversation.
    3. SUMMARIZE: If the thread is long, provide a brief summary to the user.
    4. CONFIRM: Double-check recipients, CC/BCC, and the subject line.
    5. SEND: Execute the send tool only when the draft is finalized.

    Keep your prose responses short and professional.
    `,
    tools: [listEmailTool, sendEmailTool, searchEmailTool, readEmailTool]
})