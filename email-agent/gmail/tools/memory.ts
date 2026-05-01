import { FunctionTool } from "@google/adk";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

const MEMORY_PATH = path.join(process.cwd(), "memory.json");

async function readMemory() {
    try {
        const data = await fs.readFile(MEMORY_PATH, "utf-8");
        return JSON.parse(data);
    } catch {
        return {};
    }
}

async function writeMemory(memory: any) {
    await fs.writeFile(MEMORY_PATH, JSON.stringify(memory, null, 2));
}

export const memoryTool = new FunctionTool({
    name: "manage_memory",
    description: "Saves or retrieves information from long-term memory (e.g., nicknames, preferences, contacts).",
    parameters: z.object({
        action: z.enum(["save", "lookup", "list"]).describe("The action to perform"),
        key: z.string().optional().describe("The key to save or lookup (e.g., 'wife_email')"),
        value: z.string().optional().describe("The value to save")
    }),
    execute: async ({ action, key, value }) => {
        const memory = await readMemory();

        if (action === "save" && key && value) {
            memory[key] = value;
            await writeMemory(memory);
            return { status: "success", message: `Remembered ${key} as ${value}` };
        }

        if (action === "lookup" && key) {
            return { status: "success", data: memory[key] || "No information found for that key." };
        }

        if (action === "list") {
            return { status: "success", data: memory };
        }

        return { status: "error", message: "Invalid parameters" };
    },
});
