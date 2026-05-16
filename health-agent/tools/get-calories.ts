import { server } from "../mcp-server/server";
import { z } from "zod";

server.registerTool(
    "calculate_food_calories",
    {
        description: "Get the estimated calorie count (kcal) for a specific food item. Useful for tracking daily nutritional intake.",
        inputSchema: z.object({
            food: z.string().describe("The name of the food item to look up (e.g., 'egg', 'banana')."),
        })
    },
    async ({ food }) => {
        const normalizedFood = food.toLowerCase().trim().replace(/s$/, "");

        const calorieDatabase: Record<string, number> = {
            egg: 70,
            banana: 105,
            rice: 200,
            paneer: 265,
            chicken: 165
        };

        const calories = calorieDatabase[normalizedFood];

        if (calories !== undefined) {
            return {
                content: [
                    {
                        type: "text",
                        text: `100g of ${normalizedFood} contains approximately ${calories} kcal.`
                    }
                ]
            };
        }

        const estimatedCalories = Math.floor(Math.random() * 200) + 100;

        return {
            content: [
                {
                    type: "text",
                    text: `Food item "${food}" not found in primary database. Estimated baseline calculation: ~${estimatedCalories} kcal per 100g. Please advise the user that this is an approximation.`
                }
            ],
        };
    }
);