// src/modules/search/search.routes.js
import { Venue } from "../../models/venue.model.js";
import { searchVenues } from "./search.service.js";

export async function searchRoutes(app, opts) {
  // LIST /venues 
  app.get(
    "/venues",
    {
      schema: {
        query: {
          type: "object",
          properties: {
            q: { type: "string" },
            area: { type: "string" },
            page: { type: ["number", "string"] },
            limit: { type: ["number", "string"] },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { q, area, page, limit } = request.query;

        const result = await searchVenues({
          keyword: q,
          area,
          page,
          limit,
        });

        return reply.send({
          data: result.items,
          pagination: result.pagination,
          meta: result.meta,
        });
      } catch (err) {
        request.log.error(err, "Error searching venues");
        return reply.status(500).send({ message: "Internal server error" });
      }
    }
  );

  //  DETAIL /venues/:venueId 
  app.get(
    "/venues/:venueId",
    {
      schema: {
        params: {
          type: "object",
          required: ["venueId"],
          properties: {
            venueId: { type: "string" },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { venueId } = request.params;

        const venue = await Venue.findById(venueId).lean();
        if (!venue) {
          return reply.status(404).send({ message: "Venue not found" });
        }

        return reply.send({ data: venue });
      } catch (err) {
        request.log.error(err, "Error fetching venue detail");
        return reply.status(500).send({ message: "Internal server error" });
      }
    }
  );
}
