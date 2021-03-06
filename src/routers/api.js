import express from "express";
import apiController from "../controller/apiController"

const router = express.Router();

/**
 *
 * @param {*} app
 * @returns
 */

const initApiRoutes = (app) => {


  //rest api
  // get ,post,put,delete

  router.get("/test-api", apiController.testApi)
  router.post("/register", apiController.handleRegister)
  router.post("/login", apiController.handleLogin)

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
