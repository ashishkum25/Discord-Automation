require('dotenv').config();

const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const { GoogleGenAI } = require("@google/genai");


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ]
});

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
});

async function generateImage(prompt) {
    const response = await ai.models.generateContent({
        model: 'image-4.0-generate-001',
        contents: prompt
    })
    for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          console.log(part.text);
        } else if (part.inlineData) {
          const imageData = part.inlineData.data;
          const buffer = Buffer.from(imageData, "base64");
          return buffer;
        }
      }
};

async function generateContent(prompt) {
    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt
    })
    return response.text;
}

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async (message) => {
    const isBot = message.author.bot;
    if (isBot) return;

    const content = await generateContent(message.content);
    if(content) {
        message.reply(content);
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);