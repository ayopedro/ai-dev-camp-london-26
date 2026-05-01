import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import fs from "fs/promises";
import path from "path";

const SCOPES = [
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.readonly",
];

const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CRED_PATH = path.join(process.cwd(), "credentials.json");

export async function getAuthorizedClient() {
    let client;

    try {
        const token = await fs.readFile(TOKEN_PATH, "utf-8");
        const credentials = JSON.parse(token);

        client = new google.auth.OAuth2();
        client.setCredentials(credentials);

        return client;
    } catch {
        client = await authenticate({
            scopes: SCOPES,
            keyfilePath: CRED_PATH,
        });

        await fs.writeFile(
            TOKEN_PATH,
            JSON.stringify(client.credentials)
        );

        return client;
    }
}