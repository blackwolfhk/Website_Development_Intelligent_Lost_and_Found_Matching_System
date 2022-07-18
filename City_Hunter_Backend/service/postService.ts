import { Knex } from "knex";

export class PostService {
    constructor(private knex: Knex) { }

    public async getPosts() {
        let result = await this.knex("posts")
        .select([
        "posts.*", "status.name as status_name",
        "images.path as images_path","images.post_id as images_postID",
        "latlngs.lat as latlngs_lat","latlngs.lng as latlngs_lng","latlngs.post__id as latlngs.postId"])
        .join("status", "status.id", "status_id")
        .join("images","post_id","posts.id")
        .join("latlngs","post__id","posts.id")
        .orderBy("updated_at", "desc")
        return result
    }
    public async getImages() {
        let result = await this.knex("images").select(["images.*", "posts.id as posts_id"]).join("posts", "posts.id", "post_id").orderBy("updated_at", "desc")
        return result
    }
    public async getImagesById(postId: number){
        if(postId){
            let result = await this.knex("images")
            .join("posts", "posts.id", "post_id")
            .where("posts.id", postId)
            return result
        }
        return null
    }

    public async getPostById(postId: number) {
        // select * from posts 
        // join users on posts.type_id = users.id 
        // where posts.id = 6
        let result = await this.knex("posts")
            .join("users", "post_id", "users.id")
            .where("posts.id", postId)
        return result
    }

    public async addPost(
        name: string,
        image: string,
        postId: number,
        description: string,
        lostAddress: string,
        lostTime: string,
        lostdate: string,
        price: number
    ) {
        let result = await this.knex("posts").insert({
            name,
            image,
            postId,
            description,
            lostAddress,
            lostTime,
            lostdate,
            price
        }).returning('*')
        return result;
    }

    public async inactivePost() {
        let result = await this.knex("posts")
        // add sth here...
        return result;
    }

    public async editPost() {
        let result = await this.knex("posts")
        // add sth here...
        return result;
    }
}