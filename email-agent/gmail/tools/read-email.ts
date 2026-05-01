import { FunctionTool } from "@google/adk";
import { z } from "zod";
import { getGmailService } from "../gmail-service";

function getBody(payload: any): string {
    let body = "";
    if (payload.parts) {
        for (const part of payload.parts) {
            body += getBody(part);
        }
    } else if (payload.body && payload.body.data) {
        body += Buffer.from(payload.body.data, 'base64').toString('utf-8');
    }
    return body;
}

export const readEmailTool = new FunctionTool({
    name: "gmail_read_email",
    description: "Reads an email from the user's inbox.",
    parameters: z.object({
        id: z.string().describe("Email ID"),
    }),
    execute: async ({ id }) => {
        const gmail = await getGmailService();
        const res = await gmail.users.messages.get({ userId: 'me', id });
        const data = res.data;
        const body = getBody(data.payload);

        return {
            status: "success",
            data: {
                id: data.id,
                threadId: data.threadId,
                subject: data.payload?.headers?.find((h) => h.name === "Subject")?.value,
                from: data.payload?.headers?.find((h) => h.name === "From")?.value,
                to: data.payload?.headers?.find((h) => h.name === "To")?.value,
                body,
            },
        };
    },
})