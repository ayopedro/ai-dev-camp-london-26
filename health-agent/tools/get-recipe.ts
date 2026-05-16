import { server } from "../mcp-server/server";
import { z } from "zod";

server.registerTool(
    "search_recipes",
    {
        description: "Search for healthy meals, recipes, cooking ideas, and ingredient steps based on a food keyword or dish name.",
        inputSchema: z.object({
            query: z.string().describe("The food or dish name to search for (e.g., 'chicken', 'salmon', 'lentils')."),
        })
    },
    async ({ query }) => {
        try {
            const res = await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query.trim())}`
            );

            if (!res.ok) {
                throw new Error(`MealDB API returned status code ${res.status}`);
            }

            const data = (await res.json()) as { meals: Array<Record<string, any>> | null };
            const meal = data?.meals?.[0];

            if (!meal) {
                return {
                    content: [{ type: "text", text: `No recipes found matching "${query}". Try searching with a broader ingredient or item.` }],
                };
            }

            const ingredientsList: string[] = [];
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`]?.trim();
                const measure = meal[`strMeasure${i}`]?.trim();

                if (ingredient) {
                    ingredientsList.push(`- ${measure ? `${measure} ` : ""}${ingredient}`);
                }
            }

            const responseText = [
                `Recipe Found: ${meal.strMeal}`,
                `Category: ${meal.strCategory || "General Food"}`,
                `Area/Cuisine: ${meal.strArea || "Unknown"}`,
                `\nIngredients Needed:\n${ingredientsList.join("\n")}`,
                `\nPreparation Instructions:\n${meal.strInstructions || "No instructions provided."}`,
                meal.strMealThumb ? `\nRecipe Image Reference: ${meal.strMealThumb}` : ""
            ].join("\n");

            return {
                content: [
                    {
                        type: "text",
                        text: responseText,
                    },
                ],
            };

        } catch (error: any) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error retrieving recipe data: ${error.message || error}`
                    }
                ],
                isError: true
            };
        }
    }
);