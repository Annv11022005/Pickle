import {
  createCheckoutHandler,
  momoIpnHandler,
  vnpayIpnHandler,
  confirmPaymentFromReturnHandler,
} from "./payment.controller.js";

async function paymentRoutes(app, opts) {
  // POST /api/payments/checkout
  app.post(
    "/payments/checkout",
    {
      schema: {
        body: {
          type: "object",
          required: ["paymentMethod", "bookingId"],
          properties: {
            paymentMethod: { type: "string", enum: ["MOMO", "VNPAY", "ZALOPAY"] },
            bookingId: { type: "string" },
          },
        },
      },
    },
    createCheckoutHandler
  );

  // Confirm từ trang return (MOMO/VNPAY/ZALOPAY dùng chung)
  app.post(
    "/payments/confirm-return",
    {
      schema: {
        body: {
          type: "object",
          required: ["provider", "orderId"],
          properties: {
            provider: { type: "string" },
            orderId: { type: "string" },
            success: { type: ["boolean", "number"] },
          },
        },
      },
    },
    confirmPaymentFromReturnHandler
  );

  // MoMo IPN (POST)
  app.post("/payments/momo/ipn", momoIpnHandler);

  // VNPay IPN (GET)
  app.get("/payments/vnpay/ipn", vnpayIpnHandler);
}

export default paymentRoutes;
