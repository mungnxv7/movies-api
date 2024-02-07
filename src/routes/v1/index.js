const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const docsRoute = require("./docs.route");
const config = require("../../config/config");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
}
devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         name:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin]
 *       example:
 *         id: 5ebac534954b54139806c112
 *         email: fake@example.com
 *         name: fake123 name
 *         role: user
 *
 *     Token:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         expires:
 *           type: string
 *           format: date-time
 *       example:
 *         token: 111eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWJhYzUzNDk1NGI1NDEzOTgwNmMxMTIiLCJpYXQiOjE1ODkyOTg0ODQsImV4cCI6MTU4OTMwMDI4NH0.m1U63blB0MLej_WfB7yC2FTMnCziif9X8yzwDEfJXAg
 *         expires: 2020-05-12T16:18:04.793Z
 *
 *     AuthTokens:
 *       type: object
 *       properties:
 *         access:
 *           $ref: "#/components/schemas/Token"
 *         refresh:
 *           $ref: "#/components/schemas/Token"
 *
 *     Error:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *         message:
 *           type: string
 *
 *   responses:
 *     DuplicateEmail:
 *       description: Email already taken
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Error"
 *           example:
 *             code: 400
 *             message: Email already taken
 *     Unauthorized:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Error"
 *           example:
 *             code: 401
 *             message: Please authenticate
 *     Forbidden:
 *       description: Forbidden
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Error"
 *           example:
 *             code: 403
 *             message: Forbidden
 *     NotFound:
 *       description: Not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Error"
 *           example:
 *             code: 404
 *             message: Not found
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 */
