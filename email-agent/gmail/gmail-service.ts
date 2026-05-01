import { google, gmail_v1 } from "googleapis";
import { getAuthorizedClient } from "./auth";

let gmailClient: gmail_v1.Gmail | null = null;

async function getGmailClient(): Promise<gmail_v1.Gmail> {
    if (gmailClient) return gmailClient;

    const auth = await getAuthorizedClient();

    gmailClient = google.gmail({
        version: "v1",
        auth: auth as any,
    });

    return gmailClient;
}

export async function getGmailService(): Promise<gmail_v1.Gmail> {
    return await getGmailClient();
}