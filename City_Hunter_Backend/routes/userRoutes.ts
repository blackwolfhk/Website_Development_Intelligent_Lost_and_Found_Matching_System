
import express from "express";
import { Knex } from "knex";
import { UserService } from "../service/userService";
import UserController from "../controller/userController";
import { isLoggedIn } from "../auth/guards"

export let userRoutes = express.Router();

export class UserRoutes {
  static readonly UPLOAD_DIR = "photos";
  public static InitializeUserRoutes(knex: Knex) {
    let service = new UserService(knex)
    let controller = new UserController(service)
    userRoutes.post("/register", controller.register);
    userRoutes.post("/login", controller.login);
    userRoutes.get("/me", controller.getMe);
    userRoutes.get("/logout", controller.logout);
    userRoutes.post("/login/google", controller.googleLogin);
    userRoutes.post("/login/fb", controller.fbLogin);
    userRoutes.put("/profile", isLoggedIn, controller.updateUserProfile);
  }
}



