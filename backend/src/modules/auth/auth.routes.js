// src/modules/auth/auth.routes.js
import {
  registerHandler,
  verifyEmailHandler,
  resendEmailOtpHandler,
  loginHandler,
  googleLoginHandler ,
} from "./auth.controller.js";

export async function authRoutes(app , opts ) {

  app.post(
    "/auth/register",
    {
      schema: {
        body: {
          type: "object",
          required: ["fullName", "email", "password"],
          properties: {
            fullName: { type: "string" },
            email: { type: "string", format: "email" },
            phone: { type: "string" },
            password: { type: "string", minLength: 6 },
          },
        },
      },
    },
    registerHandler
  );

  app.post(
    "/auth/verify-email",
    {
      schema: {
        body: {
          type: "object",
          required: ["email", "code"],
          properties: {
            email: { type: "string", format: "email" },
            code: { type: "string" },
          },
        },
      },
    },
    verifyEmailHandler
  );

  app.post(
    "/auth/resend-email-otp",
    {
      schema: {
        body: {
          type: "object",
          required: ["email"],
          properties: {
            email: { type: "string", format: "email" },
          },
        },
      },
    },
    resendEmailOtpHandler
  );

  //NORMAL
  app.post(
    "/auth/login",
    {
      schema: {
        body: {
          type: "object",
          required: ["identifier", "password"],
          properties: {
            identifier: { type: "string" },
            password: { type: "string" },
          },
        },
      },
    },
    loginHandler
  );

  //DEMO ATTACK NOSQL INJECTION
  // app.post("/auth/login", loginHandler);

  app.post(
    "/auth/google",
    {
      schema: {
        body: {
          type: "object",
          required: ["credential"],
          properties: {
            credential: { type: "string" },
          },
        },
      },
    },
    googleLoginHandler
  );
}
