import { server } from "../mcp-server/server";
import { z } from "zod";

let totalSteps = 0;

server.registerTool(
    "manage_steps",
    {
        description: "Track and log a user's walking steps. Can log new steps or retrieve the current total for the day.",
        inputSchema: z.object({
            action: z.enum(["add", "get"]).describe("The action to perform: 'add' to log new steps, 'get' to check total."),
            value: z.number().optional().describe("The number of steps to add. Required only when action is 'add'."),
        })
    },
    async ({ action, value }) => {
        try {
            if (action === "add") {
                if (value === undefined || value === null) {
                    return {
                        content: [{ type: "text", text: "Error: A numeric 'value' is required when adding steps." }],
                        isError: true
                    };
                }

                if (value < 0) {
                    return {
                        content: [{ type: "text", text: "Error: Step count value cannot be a negative number." }],
                        isError: true
                    };
                }

                totalSteps += value;

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully logged ${value} steps. Your new total for today is ${totalSteps} steps.`
                        }
                    ]
                };
            }

            const benchmarkMsg = totalSteps >= 10000
                ? "Excellent job! You hit the daily 10,000 steps milestone."
                : `Keep going! You are ${10000 - totalSteps} steps away from the standard 10,000 daily goal.`;

            return {
                content: [
                    {
                        type: "text",
                        text: `Current daily total: ${totalSteps} steps. ${benchmarkMsg}`
                    }
                ]
            };

        } catch (error: any) {
            return {
                content: [{ type: "text", text: `Failed to process step metrics: ${error.message || error}` }],
                isError: true
            };
        }
    }
);