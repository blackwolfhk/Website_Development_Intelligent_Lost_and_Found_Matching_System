import express from "express";
import { Knex } from "knex";
import { ChatroomService } from "../service/chatroomService";
import { ChatroomController } from "../controller/chatroomController";

export let chatroomRoutes = express.Router();

export class ChatroomRoutes {
    static readonly UPLOAD_DIR = "photos";
    public static InitializeChatroomRoutes(knex: Knex) {
        let service = new ChatroomService(knex);
        let controller = new ChatroomController(service);

        // public users
        chatroomRoutes.post("/addmsg", controller.addMessage);
        chatroomRoutes.post("/getmsg", controller.getMessage);

        // admin 
        chatroomRoutes.patch("/inactivemsg", controller.inactiveMessage);


        // chatroomRoutes.patch("/chatroom", controller.inactiveChatroom);
        // chatroomRoutes.patch("/chatroom/edit", controller.editChatroom);

    }
}