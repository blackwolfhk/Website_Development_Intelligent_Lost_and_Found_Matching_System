import { Knex } from "knex";
import XLSX from "xlsx"
import { hashPassword } from "../utils/hash";

interface Roles {
    name: string;
}

interface Status {
    name: string
}

interface Object_types {
    name: string
}

interface Users {
    username: string;
    password: string;
    mobile_no: string;
    email: string;
    address: string;
    icon: string;
    role_id: number;
}

interface Posts {
    name: string;
    description: string;
    item_color: string;
    lost_address: string;
    lost_time: string;
    date: string;
    price: number;
    type_id: number;
    status_id: number;
    user_id: number;
}

interface Images {
    path: string;
    post_id: number;
}

interface Post_records {
    post_id: number;
    user_id: number;
}

interface Chat_rooms {
    content: string;
    used_id_1: number;
    used_id_2: number;
}

interface Chat_room_messages {
    message: Text
    chat_room_id: number
}
interface Latlngs{
    lat:string;
    lng:string;
    post__id:number;
}

class ChatroomsDB {
    public static User_1Map = new Map();
    public static User_2Map = new Map();
    public content: string;
    public user_id_1: number;
    public user_id_2: number;

    constructor(chat_rooms: Chat_rooms) {
        this.content = chat_rooms.content;
        this.user_id_1 = chat_rooms.used_id_1
        this.user_id_2 = chat_rooms.used_id_2
    }

}

class PostsDB {
    public static TypeMap = new Map();
    public static StatusMap = new Map();
    public static UserMap = new Map();
    public name: string;
    public description: string;
    public item_color: string;
    public lost_address: string;
    public lost_time: string;
    public date: string;
    public price: number;
    public type_id: number;
    public status_id: number;
    public user_id: number;

    constructor(posts: Posts) {
        // console.log("date: ", posts.date)
        // console.log("lost_time: ", posts.lost_time)
        // console.log("Posts ",posts);
        // new Date(posts.date).toISOString();
        this.name = posts.name;
        this.description = posts.description;
        this.item_color = posts.item_color;
        this.lost_address = posts.lost_address;
        this.lost_time = posts.lost_time;
        this.date = posts.date
        this.price = posts.price;
        this.type_id = posts.type_id
        this.status_id = posts.status_id
        this.user_id = posts.user_id
    }

}

class ImagesDB {
    public static PostMap = new Map();
    public path: string;
    public post_id: number;
    constructor(images: Images) {
        // txn("images").insert(images).returning("*");
        this.path = images.path
        this.post_id = images.post_id
        console.log("imagesimagesimagesimagesimagesimagesimagesimagesimagesimagesimagesimagesimagesimagesimagesimagesimages")
        console.log(images)
    }
}

class PostRecordsDB {
    public static PostMap = new Map();
    public static UserMap = new Map();
    public post_id: number;
    public user_id: number;
    constructor(post_records: Post_records) {
        this.post_id = post_records.post_id
        this.user_id = post_records.user_id
    }
}

class ChatRoomMessagesDB {
    public static ChatroomMap = new Map()
    public message: Text
    public chat_room_id: number
    constructor(chatRoomMessagesDB: ChatRoomMessagesDB) {
        this.message = chatRoomMessagesDB.message
        this.chat_room_id = this.chat_room_id
    }
}
class LatlngsDB {
    public static PostMap = new Map();
    public lat: string;
    public lng: string;
    public post__id: number;
    constructor(latlngs:Latlngs) {
        // txn("images").insert(images).returning("*");
        this.lat = latlngs.lat
        this.lng = latlngs.lng
        this.post__id = latlngs.post__id
        console.log("latlngslatlngslatlngslatlngslatlngslatlngslatlngslatlngs")
        console.log(latlngs)
    }
}


export async function seed(knex: Knex): Promise<void> {
    const txn = await knex.transaction();

    try {
        let workbook = XLSX.readFile("./seeds/cityhunterDB.xlsx");

        let rolesWs = workbook.Sheets["roles"];
        let statusWs = workbook.Sheets["status"];
        let objectTypeWs = workbook.Sheets["object_types"];
        let usersWs = workbook.Sheets["users"];
        let postsWs = workbook.Sheets["posts"];
        let imagesWs = workbook.Sheets["images"];
        let postRecordWs = workbook.Sheets["post_records"];
        let chatroomWs = workbook.Sheets["chat_rooms"];
        let chatroomMessageWs = workbook.Sheets["chat_room_messages"];
        let latlngsWs = workbook.Sheets["latlngs"];


        let roles: Roles[] = XLSX.utils.sheet_to_json(rolesWs);
        let status: Status[] = XLSX.utils.sheet_to_json(statusWs);
        let objectTypes: Object_types[] = XLSX.utils.sheet_to_json(objectTypeWs);
        let users: Users[] = XLSX.utils.sheet_to_json(usersWs);
        let posts: Posts[] = XLSX.utils.sheet_to_json(postsWs);
        let images: Images[] = XLSX.utils.sheet_to_json(imagesWs);
        let postRecords: Post_records[] = XLSX.utils.sheet_to_json(postRecordWs);
        let chatrooms: Chat_rooms[] = XLSX.utils.sheet_to_json(chatroomWs);
        let chatroomMessage: Chat_room_messages[] = XLSX.utils.sheet_to_json(chatroomMessageWs);
        let latlngs: Latlngs[] = XLSX.utils.sheet_to_json(latlngsWs);



        // Deletes ALL existing entries
        // must follow the same sequence as migrations' s down function
        await txn("latlngs").del();
        await txn("chat_room_messages").del();
        await txn("chat_rooms").del();
        await txn("post_records").del();
        await txn("images").del();
        await txn("posts").del();
        await txn("users").del();
        await txn("object_types").del();
        await txn("status").del();
        await txn("roles").del();



        await txn.raw("ALTER SEQUENCE roles_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE status_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE object_types_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE posts_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE images_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE post_records_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE chat_rooms_id_seq RESTART WITH 1")
        await txn.raw("ALTER SEQUENCE chat_room_messages_id_seq RESTART WITH 1")
        // await txn.raw("ALTER SEQUENCE latlngs_id_seq RESTART WITH 1")


        // Inserts seed for Role
        await txn("roles").insert(roles).returning("id");
        // console.log(rolesResult);


        // inserts seed for Status
        await txn("status").insert(status).returning("id")
        // console.log(stautsResult);


        // Inserts seed for Object_types
        await txn('object_types').insert(objectTypes).returning("id");
        // console.log(objectTypesResult);


        // Inserts seed for User
        const usersHashed: Users[] = [];
        for (let user of users) {
            let hashedPassword = await hashPassword(user.password.toString())
            user.password = hashedPassword
            if (user.username) {
                //     let role = rolesResult.find(e => e.name === user.role_id)
                //     user.role_id = role.id
                usersHashed.push(user);
            }
        }
        let userResult = await txn("users").insert(usersHashed).returning("id");
        console.log("userResultuserResultuserResultuserResultuserResultuserResult", userResult);


        // Inserts seed for posts
        const postsDB: PostsDB[] = [];
        for (let post of posts) {
            postsDB.push(post);
        }
        // console.log("postsDB: ",postsDB);
        let postResult = await txn("posts").insert(postsDB).returning("*");
        console.log("postResultpostResultpostResultpostResultpostResult", postResult);


        // Inserts seed for Images
        const imagesDB: ImagesDB[] = [];
        console.log(imagesDB);
        let imageResult = await txn("images").insert(images).returning("id");
        console.log("imageResultimageResultimageResultimageResultimageResultimageResult", imageResult);


        // Inserts seed for Post Records
        const postRecordsDB: PostRecordsDB[] = [];
        console.log(postRecordsDB);
        let postRecordResult = await txn("post_records").insert(postRecords).returning("id");
        console.log("postRecordResultpostRecordResultpostRecordResultpostRecordResultpostRecordResult");
        // console.log();
        console.log(postRecordResult);


        // Inserts seed for Chatroom
        const chatroomsDB: ChatroomsDB[] = [];
        console.log(chatroomsDB);
        console.log(chatrooms);
        let chatroomResult = await txn("chat_rooms").insert(chatrooms).returning("id");
        console.log("chatroomResultchatroomResultchatroomResultchatroomResultchatroomResultchatroomResult");
        console.log(chatroomResult);


        // Inserts seed for ChatRoom Messages
        const chatRoomMessagesDB: ChatRoomMessagesDB[] = [];
        console.log(chatRoomMessagesDB);
        let crm = await txn("chat_room_messages").insert(chatroomMessage).returning("id");
        console.log("chatroom-testing----------------------------------------", crm);
        // Inserts seed for latlngs 
        const latlngsDB:LatlngsDB[] = []
        console.log("latlngResultlatlngResultlatlngResultlatlngResult",latlngs);
        let latlngResult = await txn("latlngs").insert(latlngs).returning("id");
        console.log("latlngResultlatlngResultlatlngResultlatlngResult",latlngResult);
        console.log(latlngsDB);
        
        
        await txn.commit();
    }


    catch (error) {
        console.log(error);
        await txn.rollback();
        await knex.destroy();
    }

}
