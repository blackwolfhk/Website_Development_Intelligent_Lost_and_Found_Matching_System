import { Request, Response } from "express";
import IncomingForm from "formidable/Formidable";
import { PostService } from "../service/postService"
import { initFormidable, uploadFormidable } from "../server";
import path from 'path'
// import { hashPassword } from "../utils/hash";
export class PostController {
    private postService: PostService;

    constructor(postService: PostService) {
        this.postService = postService;
    }

    getPosts = async (req: Request, res: Response) => {
        let status = req.query.status ? Number(req.query.status) : 0
        let price = req.query.price ? Number(req.query.price) : 0
        let districts = req.query.districts ? Number(req.query.districts) : 0
        console.log({ status })
        console.log({ price })
        console.log({ districts })

        let posts = await this.postService.getPosts(status, price, districts);
        res.json(posts);
    }

    getPostByUserId = async (req: Request, res: Response) => {
        let userId = req.users!.userId!;
        let posts = await this.postService.getPostByUserId(userId);
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
        const form: IncomingForm = initFormidable()
        form.parse(req, async (err, fields: any, files) => {
            try {
                let user_id = req.users?.userId || 1
                console.log({ user_id })
                let uploadDir = path.resolve('upload')
                const newPath = await uploadFormidable(uploadDir, files)

                // Insert Post returning id 
                const postId = (await this.postService.addPost(fields.name, fields.description, fields.item_color, fields.lost_address, fields.lost_time, fields.date, fields.price, fields.district_id, user_id))[0].id

                // Insert Image 
                const insertImage = await this.postService.addImage(newPath, postId)

                // Insert latlng
                const insertLatLng = await this.postService.saveLatLng(fields.lat, fields.lng, postId)

                console.log(newPath)
                console.log(insertImage)
                console.log(insertLatLng)

                return res.json({
                    message: "New post created successfully"
                });
            } catch (err) {
                console.log(err)
                return res.status(400).json({
                    message: err
                });
            }
        })
    }

    deletePost = async (req: Request, res: Response) => {
        const id = req.body.id
        // console.log("id----------------------", id)
        let postId = await this.postService.deletePost(id);
        // console.log("postID----------------------", postId);
        res.json(postId)
    }

    inactivePost = async (req: Request, res: Response) => {
        let post = await this.postService.inactivePost();
        res.json(post);
    }

    getPostsStatus = async (req: Request, res: Response) => {
        let posts_status = await this.postService.getPostsStatus();
        res.json(posts_status);
    }

    getPostsPrice = async (req: Request, res: Response) => {
        let posts_price = await this.postService.getPostsPrice();
        res.json(posts_price);
    }

    getPostsDistricts = async (req: Request, res: Response) => {
        let posts_districts = await this.postService.getPostsDistricts();
        res.json(posts_districts);
    }


    editUserHistoricalPosts = async (req: Request, res: Response) => {

        const id = req.body.id
        // console.log("id----------------------", id)
        let postId = await this.postService.editUserHistoricalPosts(id);
        // console.log("postID----------------------", postId);
        res.json(postId)



        // let body: EditUserHistoricalPosts = req.body
        // let {
        //     name,
        //     description,
        //     item_color,
        //     lost_address,
        //     date,
        //     lost_time,
        //     price,
        //     district_id,
        // } = body


        // try {
        //     if (!name) {
        //         res.status(401).json({ message: "Invalid item" })
        //         return
        //     }
        //     if (!description) {
        //         res.status(401).json({ message: "Invalid description" })
        //         return
        //     }
        //     if (!item_color) {
        //         res.status(401).json({ message: "Invalid color" })
        //         return
        //     }
        //     if (!lost_address) {
        //         res.status(401).json({ message: "Invalid lost address" })
        //         return
        //     }
        //     if (!date) {
        //         res.status(401).json({ message: "Invalid date" })
        //         return
        //     }
        //     if (!lost_time) {
        //         res.status(401).json({ message: "Invalid lost time" })
        //         return
        //     }
        //     if (!price) {
        //         res.status(401).json({ message: "Invalid price" })
        //         return
        //     }
        //     if (!district_id) {
        //         res.status(401).json({ message: "Invalid district" })
        //         return
        //     }


        // const hashedPassword = await hashPassword();

        // private genJwt = (user: any): string => {}
        // let editHistocialUserRecord = await this.postService.editUserHistoricalPosts(
        //     {
        //         name,
        //         description,
        //         item_color,
        //         lost_address,
        //         date,
        //         lost_time,
        //         price,
        //         district_id,
        //     }
        // )
        // console.log("editHistocialUserRecord :", editHistocialUserRecord)
        // const token = this.genJwt(editHistocialUserRecord)
        // res.json({ token })
    }
    // catch(error: any) {
    //     console.log(error)
    // res.status(400).json({ msg: error.message })
}






// export interface EditUserHistoricalPosts {
//     name: string,
//     description: string,
//     item_color: string,
//     lost_address: string,
//     date: string,
//     lost_time: string,
//     price: number,
//     district_id: number,

// }