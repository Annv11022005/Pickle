import { requireAuth } from "../../shared/middlewares/requireAuth.js";
import { requireRole } from "../../shared/middlewares/requireRole.js";
import {
  handleGetOpenHours,
  handleUpsertOpenHours,
  handleGetPriceRules,
  handleUpsertPriceRules,
  handleGetConfig,
  handleUpsertConfig,
} from "./venueConfig.controller.js";

export async function venueConfigRoutes(app, opts) {
  // ===== MỞ CỬA / ĐÓNG CỬA =====
  app.get(
    "/owner/venues/:venueId/open-hours",
    { preHandler: [requireAuth, requireRole(["OWNER"])] },
    handleGetOpenHours
  );

  app.put(
    "/owner/venues/:venueId/open-hours",
    { preHandler: [requireAuth, requireRole(["OWNER"])] },
    handleUpsertOpenHours
  );

  // ===== BẢNG GIÁ THEO KHUNG GIỜ =====
  app.get(
    "/owner/venues/:venueId/price-rules",
    { preHandler: [requireAuth, requireRole(["OWNER"])] },
    handleGetPriceRules
  );

  app.put(
    "/owner/venues/:venueId/price-rules",
    { preHandler: [requireAuth, requireRole(["OWNER"])] },
    handleUpsertPriceRules
  );

  // ===== API GỘP CHO TRANG QUẢN LÝ ĐẶT SÂN =====
  // GET: dùng khi load trang -> lấy cả openHours + priceRules
  app.get(
    "/owner/venues/:venueId/config",
    { preHandler: [requireAuth, requireRole(["OWNER"])] },
    handleGetConfig
  );

  // PUT: sau này nếu muốn lưu 1 lần (có thể dùng hoặc để đó)
  app.put(
    "/owner/venues/:venueId/config",
    { preHandler: [requireAuth, requireRole(["OWNER"])] },
    handleUpsertConfig
  );
}
