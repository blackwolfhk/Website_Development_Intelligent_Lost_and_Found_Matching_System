import { Knex } from "knex";

export class PostService {
    constructor(private knex: Knex) { }

    public async getPosts(status: number, price: number, districts: number) {
        let result = this.knex("posts")
            .select([
                "posts.*", "status.name as status_name",
                "images.path as images_path", "images.post_id as images_postID",
                "latlngs.lat as latlngs_lat", "latlngs.lng as latlngs_lng",
                "latlngs.post__id as latlngs.postId",
                "districts.name as districts_name",
                "users.mobile_no"])
            .join("status", "status.id", "status_id")
            .join("images", "post_id", "posts.id")
            .join("latlngs", "post__id", "posts.id")
            .join("districts", "district_id", "districts.id")
            .where("posts.status_id", "<", 3)
            .join("users", "user_id", "users.id")
            .orderBy("id", "DESC")

        if (status > 0) {
            result = result.where('status_id', status)
        }
        if (price == 1) {
            result = result.whereBetween('posts.price', [0, 500])
        } else if (price == 2) {
            result = result.whereBetween('posts.price', [501, 1000])
        } else if (price == 3) {
            result = result.whereBetween('posts.price', [1001, 3000])
        } else if (price == 4) {
            result = result.where('posts.price', ">", 3001)
        }
        if (districts > 0) {
            result = result.where('district_id', districts)
        }

        result = result.orderBy("updated_at", "desc")
        return await result
    }

    public async getImages() {
        let result = await this.knex("images")
            .select(["images.*", "posts.id as posts_id"])
            .join("posts", "posts.id", "images.post_id")
            .orderBy("updated_at", "desc")
        return result
    }

    public async getImagesById(postId: number) {
        if (postId) {
            let result = await this.knex("images")
                .join("posts", "posts.id", "post_id")
                .where("posts.id", postId)
            return result
        }
        return null
    }

    public async getPostById(postId: number) {
        let result = await this.knex("posts")
            .select([
                "posts.*", "status.name as status_name",
                "images.path as images_path", "images.post_id as images_postID",
                "latlngs.lat as latlngs_lat", "latlngs.lng as latlngs_lng", "latlngs.post__id as latlngs.postId",
                "users.mobile_no"])
            .join("status", "status.id", "status_id")
            .join("images", "post_id", "posts.id")
            .join("latlngs", "post__id", "posts.id")
            .join("districts", "district_id", "districts.id")
            .join("users", "user_id", "users.id")
            .where("posts.id", postId)
            .orderBy("updated_at", "desc")

        return result
    }


    public async getPostByUserId(userId: number) {
        let result = await this.knex("posts")
            .select([
                "posts.*", "status.name as status_name",
                "images.path as images_path", "images.post_id as images_postID",
                "latlngs.lat as latlngs_lat", "latlngs.lng as latlngs_lng", "latlngs.post__id as latlngs.postId"])
            .join("status", "status.id", "status_id")
            .join("images", "post_id", "posts.id")
            .join("latlngs", "post__id", "posts.id")
            .join("districts", "district_id", "districts.id")
            .where("posts.user_id", userId)
            .where("posts.status_id", "<", 3)
            .orderBy("updated_at", "desc")
        return result
    }

    public async deletePost(id: any) {
        let result = await this.knex("posts").update({
            status_id: 3
        }).where({
            id
        }).returning("id")
        console.log(result);
    }

    public async addPost(
        name: string,
        description: string,
        item_color: string,
        lost_address: string,
        lost_time: string,
        date: string,
        price: string,
        district_id: number,
        user_id: number
    ) {
        let result = await this.knex("posts").insert({
            name,
            description,
            item_color,
            lost_address,
            lost_time,
            date,
            price,
            district_id,
            status_id: 1,
            user_id
        }).returning('*')
        console.log(result);
        return result;
    }

    public async addImage(uploadDir: string, postId: number) {
        return await this.knex("images").insert({
            path: uploadDir,
            post_id: postId
        }).returning('id')
    }

    public async saveLatLng(lat: string, lng: string, postId: number) {
        return await this.knex("latlngs").insert({
            lat,
            lng,
            post__id: postId
        }).returning('id')
    }

    public async inactivePost() {
        let result = await this.knex("posts")
        // add sth here...
        return result;
    }

    public async getPostsStatus() {
        let result = await this.knex("posts")
            .select([
                "posts.*", "status.name as status_name",
                "images.path as images_path", "images.post_id as images_postID",
                "latlngs.lat as latlngs_lat", "latlngs.lng as latlngs_lng", "latlngs.post__id as latlngs.postId",
                "districts.name as districts_name"])
            .join("status", "status.id", "status_id")
            .orderBy("updated_at", "desc")

        return result
        console.log("result - getpost status postService", result);
    }

    public async getPostsPrice() {
        let result = await this.knex("posts")
            .select([])
        return result
        console.log("result - getpost price postService", result);
    }

    public async getPostsDistricts() {
        let result = await this.knex("posts")
            .select([
                "posts.*"])
        return result
    }

    public async editUserHistoricalPosts(id: any) {

        let result = await this.knex("posts").update({
            status_id: 2
        }).where({
            id
        }).returning("id")
        console.log(result);

        // let { id, ...editUserHistoricalPosts } = userHistoricalRecord
        // let result = await this.knex('posts').where({ id }).update(editUserHistoricalPosts).returning('*')
        // console.log({ result });
        // return result
    }

}