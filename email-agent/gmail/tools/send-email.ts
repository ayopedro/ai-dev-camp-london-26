import { FunctionTool } from "@google/adk";
import { z } from "zod";
import { getGmailService } from "../gmail-service";

export const sendEmailTool = new FunctionTool({
    name: "send_email",
    description: "Sends an email to a recipient.",
    parameters: z.object({
        to: z.email().describe("Recipient email address"),
        subject: z.string().describe("Email subject"),
        body: z.string().describe("Email body"),
    }),
    execute: async ({ to, subject, body }) => {
        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
        const messageParts = [
            `To: ${to}`,
            'Content-Type: text/plain; charset=utf-8',
            'MIME-Version: 1.0',
            `Subject: ${utf8Subject}`,
            '',
            body,
        ];
        const message = messageParts.join('\n');
        const encodedMessage = Buffer.from(message)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        const gmail = await getGmailService();
        await gmail.users.messages.send({ userId: 'me', requestBody: { raw: encodedMessage } });
        return { status: "success", message: "Email sent successfully" };
    },
})