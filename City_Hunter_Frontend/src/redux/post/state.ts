export interface IPostState{
    posts: PostState[]
}

export interface PostState {
    id:number;
    name:string;
    description:string;
    item_color:string;
    lost_address:string;
    lost_time:string;
    date:string;
    price:string;
    status_name:string;
    typeId:number;
    statusId:number;
    userId:number;
    images_path:string;
    post_id:number;
}