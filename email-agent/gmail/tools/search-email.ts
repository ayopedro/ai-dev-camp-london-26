import { FunctionTool } from "@google/adk";
import { z } from "zod";
import { getGmailService } from "../gmail-service";

export const searchEmailTool = new FunctionTool({
    name: "gmail_search_email",
    description: "Searches for emails in the user's inbox.",
    parameters: z.object({
        query: z.string().describe("Search query"),
    }),
    execute: async ({ query }) => {
        const gmail = await getGmailService();
        const res = await gmail.users.messages.list({ userId: 'me', q: query });
        const data = res.data.messages?.map((m) => ({ id: m.id, threadId: m.threadId })) || [];
        return {
            status: "success",
            data,
        };
    },
})