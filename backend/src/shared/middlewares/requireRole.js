
/**
 * Middleware factory to check user roles.
 * @param {string[]} allowedRoles - Array of allowed roles (e.g. ['ADMIN', 'OWNER'])
 * @returns {import('fastify').preHandlerHookHandler}
 */
export function requireRole(allowedRoles) {
  return async (request, reply) => {
    const userRole = request.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return reply.code(403).send({
        message: "Forbidden: You do not have permission to access this resource",
        requiredRoles: allowedRoles,
        currentRole: userRole,
      });
    }
  };
}




