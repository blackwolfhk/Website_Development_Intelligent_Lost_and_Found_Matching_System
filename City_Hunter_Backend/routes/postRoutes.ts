import express from "express";
import { Knex } from "knex";
import { PostService } from "../service/postService"
import { PostController } from "../controller/postController";

export let postRoutes = express.Router();

export class PostRoutes {
    static readonly UPLOAD_DIR = "upload";
    public static InitializePostRoutes(knex: Knex) {
        let service = new PostService(knex);
        let controller = new PostController(service);
        postRoutes.get("/posts", controller.getPosts);
        postRoutes.get("/images", controller.getImages);
        postRoutes.get("/image/:id", controller.getImagesById);
        postRoutes.get("/post/:id", controller.getPostById);
        postRoutes.post("/post", controller.addPost);
        postRoutes.patch("/post", controller.inactivePost);
        postRoutes.patch("/post/edit", controller.editPost);
        
    }
}