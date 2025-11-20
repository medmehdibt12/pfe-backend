import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PFE Backend API",
      version: "1.0.0",
      description:
        "API Backend pour suivi PFE : auth, projets, sprints, dashboard",
    },
    servers: [{ url: "http://localhost:5000", description: "Dev server" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string" },
          },
        },
        Project: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            student: { type: "string" },
          },
        },
        Sprint: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            goal: { type: "string" },
            startDate: { type: "string", format: "date" },
            endDate: { type: "string", format: "date" },
            project: { type: "string" },
          },
        },
        Dashboard: {
          type: "object",
          properties: {
            totalProjects: { type: "integer" },
            totalSprints: { type: "integer" },
            tasksDone: { type: "integer" },
            tasksPending: { type: "integer" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"], // Swagger lira les commentaires JSDoc
};

const swaggerSpec = swaggerJsDoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
