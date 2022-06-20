import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();

/**
 *
 * @param {*} app
 * @returns
 */

const initWebRoutes = (app) => {
  //path , handler
  router.get("/", homeController.handleHelloWord);
  // router.get("/about", (req, res) => {
  //   return res.send("hello dang doin");
  // });-- cach 1

  router.get("/user", homeController.handleUserPage);
  // day du lieu len
  router.post("/users/create-user", homeController.handleCreateNewUser);

  // delete
  router.post("/delete-user/:id", homeController.handeDeleteUser);

  // update
  router.get("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/users/update-user", homeController.handleUpdateUser);

  return app.use("/", router);
};

export default initWebRoutes;
