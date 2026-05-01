import { FunctionTool } from "@google/adk";
import { z } from "zod";
import { getGmailService } from "../gmail-service";

export const listEmailTool = new FunctionTool({
    name: "gmail_list_emails",
    description: "Retrieves a list of emails from the user's inbox.",
    parameters: z.object({
        limit: z.number().default(10).describe("Maximum number of emails to retrieve.")
    }),
    execute: async ({ limit }) => {
        const gmail = await getGmailService();
        const listRes = await gmail.users.messages.list({ userId: 'me', maxResults: limit });
        const messages = listRes.data.messages || [];

        const emails = await Promise.all(messages.map(async (m) => {
            const detail = await gmail.users.messages.get({ userId: 'me', id: m.id!, format: 'metadata', metadataHeaders: ['Subject', 'Date', 'From'] });
            return {
                id: m.id,
                threadId: m.threadId,
                subject: detail.data.payload?.headers?.find(h => h.name === 'Subject')?.value,
                from: detail.data.payload?.headers?.find(h => h.name === 'From')?.value,
                date: detail.data.payload?.headers?.find(h => h.name === 'Date')?.value,
            };
        }));

        return { status: "success", data: JSON.stringify(emails) };
    },
})