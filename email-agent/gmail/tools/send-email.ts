import { FunctionTool } from "@google/adk";
import { z } from "zod";
import { getGmailService } from "../gmail-service.js";

export const sendEmailTool = new FunctionTool({
    name: "gmail_send_message",
    description: "Sends an email to a recipient with optional CC and BCC.",
    parameters: z.object({
        to: z.array(z.email()).describe("List of primary recipient email addresses"),
        cc: z.array(z.email()).optional().describe("List of CC recipients"),
        bcc: z.array(z.email()).optional().describe("List of BCC recipients"),
        subject: z.string().describe("Email subject"),
        body: z.string().describe("Email body"),
    }),
    execute: async ({ to, cc, bcc, subject, body }) => {
        const gmail = await getGmailService();

        // 1. Construct the MIME message properly
        const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
        const messageParts = [
            `To: ${to.join(', ')}`,
            cc && cc.length > 0 ? `Cc: ${cc.join(', ')}` : '',
            bcc && bcc.length > 0 ? `Bcc: ${bcc.join(', ')}` : '',
            'Content-Type: text/plain; charset=utf-8',
            'MIME-Version: 1.0',
            `Subject: ${utf8Subject}`,
            '',
            body,
        ].filter(line => line !== ''); // Remove empty CC/BCC lines if they don't exist

        const message = messageParts.join('\n');

        // 2. Base64url encode the message
        const encodedMessage = Buffer.from(message)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        // 3. Send via the authorized client
        await gmail.users.messages.send({
            userId: 'me',
            requestBody: { raw: encodedMessage }
        });

        return { status: "success", message: `Email sent to ${to.join(', ')}` };
    },
});