import { MCPToolset } from "@google/adk";

export const sharedToolset = new MCPToolset({
    type: "StdioConnectionParams",
    serverParams: {
        command: "npx",
        args: ["tsx", "mcp-server/index.ts"],
    },
});
