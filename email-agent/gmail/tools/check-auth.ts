import { FunctionTool } from "@google/adk";
import { z } from "zod";
import { getGmailService } from "../gmail-service";

export const checkAuthTool = new FunctionTool({
    name: "gmail_check_connection",
    description: "Verifies if the Gmail specialist is authenticated and ready to handle requests.",
    parameters: z.object({}),
    execute: async () => {
        try {
            const gmail = await getGmailService();
            const res = await gmail.users.getProfile({ userId: 'me' });
            return { 
                status: "success", 
                message: `Authenticated successfully as ${res.data.emailAddress}.`,
                authenticated: true 
            };
        } catch (error) {
            return { 
                status: "error", 
                message: "Authentication required. A login window may have opened on the host machine.",
                authenticated: false 
            };
        }
    },
});
