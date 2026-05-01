import { google, gmail_v1 } from "googleapis";
import { getAuthorizedClient } from "./auth";

async function getGmailClient(): Promise<gmail_v1.Gmail> {
    const auth = await getAuthorizedClient();

    return google.gmail({
        version: "v1",
        auth: auth as any,
    });
}

export async function getGmailService(): Promise<gmail_v1.Gmail> {
    return await getGmailClient();
}