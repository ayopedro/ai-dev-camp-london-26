# School Multi-Agent System

This project is a multi-agent system designed to simulate a school environment where an administrator (Shawn) delegates questions to specialized subject teachers. It is built using the [Google Agent Development Kit (ADK)](https://adk.dev).

## Architecture

The system follows a hierarchical structure:

- **Main Agent (Administrator):** `Shawn` acts as the entry point. He understands the user's request and delegates it to the appropriate subject teacher using the `subAgent` tool.
- **Sub-Agents (Teachers):** Specialized agents for various subjects:
    - **Maths:** Mr. Smith (includes a `calculate` tool).
    - **Physics:** Ms. Penelope.
    - **Chemistry:** Dr. Michael.
    - **Biology:** Ms. Lola.
    - **History:** Mr. Martinez.
    - **Geography:** Mr. Bernard.
    - **Computer Science:** Dr. Thompson.

## Project Structure

```text
.
├── agent.ts                # Main entry point and Administrator agent
├── sub-agents/             # Directory containing specialized agents
│   ├── biology_agent/
│   ├── chemistry_agent/
│   ├── comp_sci_agent/
│   ├── geography_agent/
│   ├── history_agent/
│   ├── maths_agent/
│   └── physics_agent/
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js installed.
- A Gemini API key (set in your `.env` file).

### Installation

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

### Running the System

You can run the agent in the terminal or using the ADK Web Server.

**Web Interface (Recommended):**
```bash
npm run dev
```
This will start the ADK Web Server. You can access the chat interface at the URL provided in the terminal (usually `http://localhost:8000`).

**Terminal Interface:**
```bash
npx adk run agent.ts
```

## Technology Stack

- **[Google ADK](https://adk.dev):** Framework for building agentic applications.
- **TypeScript:** Language for building the agents.
- **Zod:** Used for tool parameter validation.
- **Gemini:** The underlying LLM (specifically `gemini-flash-latest`).
