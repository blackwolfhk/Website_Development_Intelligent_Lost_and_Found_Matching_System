import { Request, Response } from "express";
import { PostService } from "../service/postService"

export class PostController {
    private postService: PostService;

    constructor(postService: PostService) {
        this.postService = postService;
    }

    getPosts = async (req: Request, res: Response) => {
        let posts = await this.postService.getPosts();
        res.json(posts);
    }
    getImages = async (req: Request, res: Response) => {
        let images = await this.postService.getImages();
        res.json(images);
    }
    getImagesById = async (req: Request, res: Response) => {
        const postId = parseInt(req.params.id)
        let images = await this.postService.getImagesById(postId);
        res.json(images)
    }

    getPostById = async (req: Request, res: Response) => {
        let postId = parseInt(req.params.id)
        let post = await this.postService.getPostById(postId);
        res.json(post);
    }
    
    addPost = async (req: Request, res: Response) => {
        let { name, description, image, postId, price } = req.body
        if (!Number(price)) {
            res.status(400).json({ error: "Invalid price" })
            return
        }
        if (!name || !image || !postId || !description) {
            res.status(400).json({ error: "Invalid info" })
            return
        }
        // await this.postService.addPost(name, image, postId, description, Number(price));
        res.json({
            message: "New post created successfully"
        });
    }

    inactivePost = async (req: Request, res: Response) => {
        let post = await this.postService.inactivePost();
        res.json(post);
    }

    editPost = async (req: Request, res: Response) => {
        let post = await this.postService.editPost();
        res.json(post);
    }

}