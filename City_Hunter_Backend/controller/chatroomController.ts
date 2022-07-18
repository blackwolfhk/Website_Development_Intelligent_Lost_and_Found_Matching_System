import { Request, Response } from "express";
import { ChatroomService } from "../service/chatroomService";

export class ChatroomController {
    private chatroomService: ChatroomService;

    constructor(chatroomService: ChatroomService) {
        this.chatroomService = chatroomService;
    }

    addMessage = async (req: Request, res: Response) => {
        let { user1, user2 } = req.body;
        // let messages = await this.chatroomService.addMessages();
        if (!user1 || !user2) {
            res.status(400).json({ error: "Invalid context" })
            return
        }
        res.json({ messages: "New message created successfully" })
    }

    getMessage = async (req: Request, res: Response) => {
        let data = await this.chatroomService.getMessages();
        if (!data) {
            return res.json({ msg: "Failed to add messages to the database" });
            res.status(500).json({
                meesage: "Failed to add message to the database",
            })
        } else {
            return res.json({ msg: "Messages added successfully." });
        }
    }

    inactiveMessage = async (req: Request, res: Response) => {
        let message = await this.chatroomService.inactiveMessage();
        res.json(message);
    }





    // inactiveChatroom = async (req: Request, res: Response) => { }

    // editChatroom = async (req: Request, res: Response) => { }

}

