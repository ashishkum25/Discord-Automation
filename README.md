# 🤖 Gemini Discord Bot (Discord-Automation)

A simple and intelligent Discord bot built with **Node.js** and the **`discord.js`** library, powered by **Google's Gemini models** for dynamic and conversational responses.

This project is currently configured as an autonomous chatbot that processes every user message and replies using the Gemini API. It also includes a structure for future expansion into image generation.

---

## ✨ Features

* **Intelligent Conversational AI:** Uses the powerful `gemini-2.0-flash` model to engage in natural, text-based conversations within Discord channels.
* **Discord Integration:** Monitors the `messageCreate` event to automatically respond to all non-bot messages.
* **Image Generation Ready:** Contains a function (`generateImage`) utilizing the `image-4.0-generate-001` model, providing a clear path for adding a text-to-image command.
* **Secure Configuration:** Manages all sensitive API keys and tokens using environment variables (`dotenv`).

---

## 🛠️ Setup and Installation

### Prerequisites

* **Node.js** (v18 or higher recommended)
* A **Discord Application** and **Bot Token**.
    * *Ensure you enable the **Message Content Intent** in your Discord Application's settings.*
* A **Google AI API Key**.

### Steps

1.  **Clone the Repository**

    ```bash
    git clone [https://github.com/ashishkum25/Discord-Automation](https://github.com/ashishkum25/Discord-Automation)
    cd Discord-Automation
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    # Dependencies: discord.js, @google/genai, dotenv
    ```

3.  **Configure Environment Variables**

    Create a file named **`.env`** in the root directory of your project and add your credentials:

    ```env
    # Your Google AI API Key for accessing the Gemini models
    GOOGLE_API_KEY=YOUR_GEMINI_API_KEY_HERE

    # Your Discord Bot Token (from the Discord Developer Portal)
    DISCORD_BOT_TOKEN=YOUR_DISCORD_BOT_TOKEN_HERE
    ```

4.  **Run the Bot**

    Start the bot using Node:

    ```bash
    node <your-main-file-name>.js 
    # e.g., node index.js
    ```

    You should see `Bot is online!` in your console, and the bot will be active in your Discord server.

---

## 🚀 Extending the Bot

The current architecture is perfect for a basic chatbot. Here are the logical next steps to turn it into a full-featured utility bot:

### 1. Integrate the Image Generation Command

The `generateImage` function is already defined. You can integrate it by adding command parsing to the `client.on('messageCreate', ...)` block:

```javascript
// Example modification for image command
client.on('messageCreate', async (message) => {
    const isBot = message.author.bot;
    if (isBot) return;

    if (message.content.toLowerCase().startsWith('!image ')) {
        const prompt = message.content.slice('!image '.length).trim();
        try {
            const buffer = await generateImage(prompt);
            const attachment = new AttachmentBuilder(buffer, { name: 'generated_image.png' });
            message.reply({ files: [attachment] });
        } catch (error) {
            console.error(error);
            message.reply("Sorry, I couldn't generate that image right now.");
        }
    } else {
        // Fallback to text generation for all other messages
        const content = await generateContent(message.content);
        if(content) {
            message.reply(content);
        }
    }
});
