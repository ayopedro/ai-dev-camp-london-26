# Lara: Your Executive Email Agent 📧✨

Lara is a sophisticated multi-agent system built with the **Google Agent Development Kit (ADK)**. She acts as a high-level executive assistant who handles your Gmail inbox with a professional, friendly persona, delegating technical operations to a specialized sub-agent.

## 🚀 Overview

Lara is designed to take the friction out of email management. Instead of you digging through threads, Lara can summarize your unread messages, find specific information, and even draft creative replies—like poems—for your loved ones.

### Key Features
- **Multi-Agent Orchestration**: An executive manager (Lara) coordinates with a specialist technical agent.
- **Persistent Memory**: Lara remembers nicknames (e.g., "my wife", "my boss") and their associated email addresses.
- **Robust Gmail Integration**: Support for searching, listing, reading (including multi-part MIME), and sending emails.
- **Secure OAuth2 Flow**: Automated token refresh and secure credential handling.

---

## 📸 Screenshots

### Delegating Tasks
Lara coordinates between agents to execute complex technical tasks seamlessly.
![Lara delegating tasks](./assets/Screenshot%202026-05-01%20at%2014.02.25.png)

### Creative Drafting
Lara isn't just a bot; she has a persona. Here she is drafting a heartfelt poem for a user's wife.
![Creative Drafting](./assets/Screenshot%202026-05-01%20at%2014.06.39.png)

---

## 🛠 Architecture

The project is split into two main agents:
1. **Lara (Executive Agent)**: The primary interface. She handles the conversation, understands intent, and manages the "memory" of the relationship.
2. **Gmail Specialist**: A technical agent equipped with specialized tools to interact with the Gmail API safely and efficiently.

### Tools
- `gmail_list_emails`: Fetches latest emails with subjects and dates.
- `gmail_read_email`: Reads full content, including complex HTML/Plain Text parts.
- `gmail_search_email`: Powerful search query support.
- `gmail_send_message`: Supports TO, CC, and BCC with full UTF-8 support.
- `manage_memory`: Stores and retrieves contact nicknames and user preferences.

---

## ⚙️ Setup

### Prerequisites
- Node.js installed.
- A `credentials.json` file from the [Google Cloud Console](https://console.cloud.google.com/) with the Gmail API enabled.
- Redirect URI set to `http://localhost:3000/oauth2callback`.

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file with your `GOOGLE_GENAI_API_KEY`.

### Running the Agent
Start the ADK development server:
```bash
npx adk web
```
The first time you run a Gmail tool, a browser window will open for you to authorize the application.

---

## 📝 Example Prompts
- *"Lara, check my unread emails and tell me if there's anything urgent from my boss."*
- *"Remember that my wife's email is [EMAIL_ADDRESS]."*
- *"Send an email to my wife telling her I love her. Make it a nice poem."*

---
*Built with ❤️ using Google ADK.*
