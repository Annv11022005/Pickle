// backend/src/modules/adminVenues/adminVenue.routes.js
import { requireAuth } from "../../shared/middlewares/requireAuth.js";
import { requireRole } from "../../shared/middlewares/requireRole.js";
import {
    listAdminVenuesHandler,
    createAdminVenueHandler,
    updateAdminVenueHandler,
    deleteAdminVenueHandler,
    adminGetVenueConfigHandler,
    adminUpsertVenueConfigHandler,
} from "./adminVenue.controller.js";

export async function adminVenueRoutes(app, opts) {
    app.get(
        "/admin/venues",
        { preHandler: [requireAuth, requireRole(["ADMIN"])] },
        listAdminVenuesHandler
    );

    app.post(
        "/admin/venues",
        { preHandler: [requireAuth, requireRole(["ADMIN"])] },
        createAdminVenueHandler
    );

    app.put(
        "/admin/venues/:venueId",
        { preHandler: [requireAuth, requireRole(["ADMIN"])] },
        updateAdminVenueHandler
    );

    app.delete(
        "/admin/venues/:venueId",
        { preHandler: [requireAuth, requireRole(["ADMIN"])] },
        deleteAdminVenueHandler
    );

    // ===== CONFIG (openTime / closeTime / priceRules) cho ADMIN =====
    app.get(
        "/admin/venues/:venueId/config",
        { preHandler: [requireAuth, requireRole(["ADMIN"])] },
        adminGetVenueConfigHandler
    );

    app.put(
        "/admin/venues/:venueId/config",
        { preHandler: [requireAuth, requireRole(["ADMIN"])] },
        adminUpsertVenueConfigHandler
    );
}
