import { Knex } from "knex";


export class ChatroomService {
    constructor(private knex: Knex) { }

    public async addMessages(
        message: string,
    ) {
        let result = await this.knex("chat_room_messages").insert({
            message
        }).returning('*')
        return result;
    }


    public async getMessages() {
        let result = await this.knex("chat_room_messages")
            .select(["chat_room_meesages.*", "chat_rooms.id as chat_room_id"])
            .join("chat_rooms", "chat_rooms.id", "chat_rooms.id")
            .orderBy("updated_at", "desc")
        return result
    }

    public async inactiveMessage() { }




    // public async inactiveChatroom() {
    //     let result = await this.knex("chatrooms")
    //     // add sth here...
    //     return result
    // }

    // public async editChatroom() {
    //     let result = await this.knex("chatrooms")
    //     // add sth here...
    //     return result
    // }

}