import express from "express";
import { Knex } from "knex";
import { PostService } from "../service/postService"
import { PostController } from "../controller/postController";
import { isLoggedIn } from "../auth/guards";

export let postRoutes = express.Router();

export class PostRoutes {
    static readonly UPLOAD_DIR = "upload";
    public static InitializePostRoutes(knex: Knex) {
        let service = new PostService(knex);
        let controller = new PostController(service);
        postRoutes.get("/posts", controller.getPosts);
        postRoutes.get("/post/:id", controller.getPostById);
        postRoutes.get("post/status", controller.getPostsStatus);
        postRoutes.get("post/price", controller.getPostsPrice);
        postRoutes.get("post/districts", controller.getPostsDistricts)
        postRoutes.delete("/post/delete", controller.deletePost)
        postRoutes.patch("/post", controller.inactivePost);
        postRoutes.get("/images", controller.getImages);
        postRoutes.get("/image/:id", controller.getImagesById);
        postRoutes.post("/post", isLoggedIn, controller.addPost);
        postRoutes.get("/user/post", isLoggedIn, controller.getPostByUserId)
        postRoutes.put("/post/edit", controller.editUserHistoricalPosts);
    }
}