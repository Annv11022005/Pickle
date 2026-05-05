import { requireAuth } from "../../shared/middlewares/requireAuth.js";
import { requireRole } from "../../shared/middlewares/requireRole.js";
import {
    listAdminsHandler,
    createAdminHandler,
    updateAdminHandler,
    deleteAdminHandler,
    listCustomersHandler,
    createCustomerHandler,
    updateCustomerHandler,
    deleteCustomerHandler,
    listOwnersHandler,
    createOwnerHandler,
    updateOwnerHandler,
    deleteOwnerHandler,
    getMeHandler,
    updateMeHandler,
    changeMyPasswordHandler,
} from "./user.controller.js";


export default async function userRoutes(app, opts) {
    // Tất cả route dưới đây đều require login
    app.addHook("onRequest", requireAuth);

    // GET /api/admin/admins
    app.get("/admin/admins", { preHandler: [requireRole(["ADMIN"])] }, listAdminsHandler);

    app.post(
        "/admin/admins",
        {
            preHandler: [requireRole(["ADMIN"])],
            schema: {
                body: {
                    type: "object",
                    required: ["fullName", "email", "password", "status"],
                    properties: {
                        fullName: { type: "string" },
                        email: { type: "string" },
                        phone: { type: "string" },
                        password: { type: "string", minLength: 6 },
                        status: {
                            type: "string",
                            enum: ["ACTIVE", "PENDING", "INACTIVE"],
                        },
                        canManageAdmins: { type: "boolean" },
                    },
                },
            },
        },
        createAdminHandler
    );

    // PUT /api/admin/admins/:adminId
    app.put(
        "/admin/admins/:adminId",
        {
            preHandler: [requireRole(["ADMIN"])],
            schema: {
                params: {
                    type: "object",
                    required: ["adminId"],
                    properties: {
                        adminId: { type: "string" },
                    },
                },
                body: {
                    type: "object",
                    required: ["fullName", "status"],
                    properties: {
                        fullName: { type: "string" },
                        phone: { type: "string" },
                        password: { type: "string", minLength: 6 },
                        status: {
                            type: "string",
                            enum: ["ACTIVE", "PENDING", "INACTIVE"],
                        },
                        canManageAdmins: { type: "boolean" },
                    },
                },
            },
        },
        updateAdminHandler
    );

    // DELETE /api/admin/admins/:adminId
    app.delete(
        "/admin/admins/:adminId",
        {
            preHandler: [requireRole(["ADMIN"])],
            schema: {
                params: {
                    type: "object",
                    required: ["adminId"],
                    properties: {
                        adminId: { type: "string" },
                    },
                },
            },
        },
        deleteAdminHandler
    );
    // ==============================
    // ADMIN MANAGE CUSTOMERS
    // ==============================

    // GET /api/admin/users
    app.get("/admin/users", { preHandler: [requireRole(["ADMIN"])] }, listCustomersHandler);

    // POST /api/admin/users
    app.post(
        "/admin/users",
        {
            preHandler: [requireRole(["ADMIN"])],
            schema: {
                body: {
                    type: "object",
                    required: ["fullName", "email", "password", "status"],
                    properties: {
                        fullName: { type: "string" },
                        email: { type: "string" },
                        phone: { type: "string" },
                        address: { type: "string" },
                        password: { type: "string", minLength: 6 },
                        status: {
                            type: "string",
                            enum: ["ACTIVE", "PENDING", "INACTIVE"],
                        },
                    },
                },
            },
        },
        createCustomerHandler
    );

    // PUT /api/admin/users/:userId
    app.put(
        "/admin/users/:userId",
        {
            preHandler: [requireRole(["ADMIN"])],
            schema: {
                params: {
                    type: "object",
                    required: ["userId"],
                    properties: {
                        userId: { type: "string" },
                    },
                },
                body: {
                    type: "object",
                    required: ["fullName", "status"],
                    properties: {
                        fullName: { type: "string" },
                        phone: { type: "string" },
                        address: { type: "string" },
                        password: { type: "string", minLength: 6 },
                        status: {
                            type: "string",
                            enum: ["ACTIVE", "PENDING", "INACTIVE"],
                        },
                    },
                },
            },
        },
        updateCustomerHandler
    );

    // DELETE /api/admin/users/:userId
    app.delete(
        "/admin/users/:userId",
        {
            preHandler: [requireRole(["ADMIN"])],
            schema: {
                params: {
                    type: "object",
                    required: ["userId"],
                    properties: {
                        userId: { type: "string" },
                    },
                },
            },
        },
        deleteCustomerHandler
    );

    // ========== ADMIN - QUẢN LÝ CHỦ SÂN ==========
    app.get(
        "/admin/owners",
        { preHandler: [requireRole(["ADMIN"])] },
        listOwnersHandler
    );

    app.post(
        "/admin/owners",
        { preHandler: [requireRole(["ADMIN"])] },
        createOwnerHandler
    );

    app.put(
        "/admin/owners/:ownerId",
        { preHandler: [requireRole(["ADMIN"])] },
        updateOwnerHandler
    );

    app.delete(
        "/admin/owners/:ownerId",
        { preHandler: [requireRole(["ADMIN"])] },
        deleteOwnerHandler
    );
    app.get("/users/me", getMeHandler);
    app.patch("/users/me", updateMeHandler);
    app.patch("/users/me/password", changeMyPasswordHandler);
}





