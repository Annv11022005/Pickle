// backend/src/modules/chatbot/chatbot.routes.js
import { chatbotMessageHandler } from "./chatbot.controller.js";

export async function chatbotRoutes(app) {
  // POST /api/chatbot/message
  app.post(
    "/chatbot/message",
    {
      schema: {
        body: {
          type: "object",
          required: ["message"],
          properties: {
            message: { type: "string", minLength: 1 },
          },
        },
      },
    },
    chatbotMessageHandler
  );
}
