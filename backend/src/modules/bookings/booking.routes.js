// backend/src/modules/bookings/booking.routes.js
import {
  createBookingHandler,
  getVenueAvailabilityHandler,
  getUserBookingHistoryHandler,
  getOwnerDailyOverviewHandler,
  getOwnerVenuesHandler,
  getAdminDailyOverviewHandler,
  getUserBookingDetailHandler,
  cancelUserBookingHandler,
  createGuestBookingHandler ,
} from "./booking.controller.js";
import { requireAuth } from "../../shared/middlewares/requireAuth.js";
import { requireRole } from "../../shared/middlewares/requireRole.js";

export async function bookingRoutes(app, opts) {
  // Tạo booking - BẮT BUỘC ĐĂNG NHẬP
  app.post(
    "/bookings",
    {
      preHandler: [requireAuth],
      schema: {
        body: {
          type: "object",
          required: ["venueId", "date", "courts"],
          properties: {
            venueId: { type: "string" },
            date: { type: "string", format: "date" },
            courts: {
              type: "array",
              items: {
                type: "object",
                required: ["courtId", "slots"],
                properties: {
                  courtId: { type: "string" },
                  slots: {
                    type: "array",
                    items: { type: "string" }, // "SlotStart-SlotEnd"
                  },
                },
              },
            },
            discount: { type: "number" },
            note: { type: "string" },
            addons: {
              type: "array",
              items: {
                type: "object",
                required: ["addonId", "quantity"],
                properties: {
                  addonId: { type: "string" },
                  quantity: { type: "number", minimum: 1 },
                },
              },
            },
            addonsTotal: { type: "number" },
          },
        },
      },
    },
    createBookingHandler
  );

  // Availability theo venue + ngày (cho FE user & owner)
  app.get(
    "/venues/:venueId/availability",
    {
      schema: {
        params: {
          type: "object",
          required: ["venueId"],
          properties: {
            venueId: { type: "string" },
          },
        },
        query: {
          type: "object",
          required: ["date"],
          properties: {
            date: { type: "string", format: "date" },
          },
        },
      },
    },
    getVenueAvailabilityHandler
  );

  // Lịch sử đặt sân của user
  app.get(
    "/bookings/history",
    {
      onRequest: [requireAuth],
      schema: {
        query: {
          type: "object",
          properties: {
            page: { type: ["number", "string"], default: 1 },
            limit: { type: ["number", "string"], default: 10 },
            status: { type: "string" }, // string separated by commas
          },
        },
      },
    },
    getUserBookingHistoryHandler
  );

  // Danh sách venue thuộc owner hiện tại
  app.get(
    "/owner/venues",
    { preHandler: [requireAuth, requireRole(["OWNER"])] },
    getOwnerVenuesHandler
  );

  // Overview đặt sân trong 1 ngày cho owner
  app.get(
    "/owner/bookings/daily",
    {
      preHandler: [requireAuth, requireRole(["OWNER"])],
      schema: {
        query: {
          type: "object",
          required: ["date"],
          properties: {
            date: { type: "string", format: "date" },
            venueId: { type: "string" },
          },
        },
      },
    },
    getOwnerDailyOverviewHandler
  );
  // Overview đặt sân trong 1 ngày cho ADMIN (xem mọi sân)
  app.get(
    "/admin/bookings/daily",
    {
      preHandler: [requireAuth, requireRole(["ADMIN"])],
      schema: {
        query: {
          type: "object",
          required: ["date"],
          properties: {
            date: { type: "string", format: "date" },
            venueId: { type: "string" },
          },
        },
      },
    },
    getAdminDailyOverviewHandler
  );

  // Chi tiết 1 booking của user (dùng cho popup hóa đơn)
  app.get(
    "/bookings/:bookingId",
    {
      onRequest: [requireAuth],
      schema: {
        params: {
          type: "object",
          required: ["bookingId"],
          properties: {
            bookingId: { type: "string" },
          },
        },
      },
    },
    getUserBookingDetailHandler
  );

  // Hủy 1 booking của user
  app.post(
    "/bookings/:bookingId/cancel",
    {
      onRequest: [requireAuth],
      schema: {
        params: {
          type: "object",
          required: ["bookingId"],
          properties: {
            bookingId: { type: "string" },
          },
        },
      },
    },
    cancelUserBookingHandler
  );

  app.post(
    "/bookings/guest",
    {
      schema: {
        body: {
          type: "object",
          required: ["venueId", "date", "courts", "guestInfo"],
          properties: {
            venueId: { type: "string" },
            date: { type: "string", format: "date" },
            courts: { type: "array" },
            guestInfo: {
              type: "object",
              required: ["fullName", "phone"],
              properties: {
                fullName: { type: "string" },
                phone: { type: "string" },
                email: { type: "string", format: "email" },
              },
            },
            discount: { type: "number" },
            note: { type: "string" },
            addons: { type: "array" },
            addonsTotal: { type: "number" },
          },
        },
      },
    },
    createGuestBookingHandler
  );
}
