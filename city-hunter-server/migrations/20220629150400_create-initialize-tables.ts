import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("roles"))) {
        await knex.schema.createTable("roles", (table) => {
            table.increments();
            table.string("name");
            table.timestamps(false, true);
        });
    }
    if (!(await knex.schema.hasTable("status"))) {
        await knex.schema.createTable("status", (table) => {
            table.increments();
            table.string("name");
            table.timestamps(false, true);
        });
    }
    if (!(await knex.schema.hasTable("object_types"))) {
        await knex.schema.createTable("object_types", (table) => {
            table.increments();
            table.string("name");
            table.timestamps(false, true);
        });
    }
    if (!(await knex.schema.hasTable("users"))) {
        await knex.schema.createTable("users", (table) => {
            table.increments();
            table.string("username");
            table.string("password");
            table.string("mobile_no");
            table.string("email");
            table.text("address");
            table.string("icon");
            table.integer("role_id").unsigned().notNullable();
            table.foreign("role_id").references("roles.id");
            table.timestamps(false, true);
        })
    }
    if (!(await knex.schema.hasTable("posts"))) {
        await knex.schema.createTable("posts", (table) => {
            table.increments();
            table.text("name");
            table.text("description");
            table.text("item_color");
            table.text("lost_address");
            table.time("lost_time");
            table.timestamp("date");
            table.text("price");
            table.integer("type_id").unsigned().notNullable();
            table.foreign("type_id").references("object_types.id");
            table.integer("status_id").unsigned().notNullable();
            table.foreign("status_id").references("status.id");
            table.integer("user_id").unsigned().notNullable();
            table.foreign("user_id").references("users.id");
            table.timestamps(false, true);
        })
    }
    if (!(await knex.schema.hasTable("images"))) {
        await knex.schema.createTable("images", (table) => {
            table.increments();
            table.string("path");
            table.integer("post_id").unsigned().notNullable();
            table.foreign("post_id").references("posts.id");
            table.timestamps(false, true);
        })
    }
    if (!(await knex.schema.hasTable("post_records"))) {
        await knex.schema.createTable("post_records", (table) => {
            table.increments();
            table.integer("user_id").unsigned().notNullable();
            table.foreign("user_id").references("users.id");
            table.integer("post_id").unsigned().notNullable();
            table.foreign("post_id").references("posts.id");
            table.timestamps(false, true);
        })
    }
    if (!(await knex.schema.hasTable("chat_rooms"))) {
        await knex.schema.createTable("chat_rooms", (table) => {
            table.increments();
            table.string("content");
            table.integer("user_id_1").unsigned().notNullable();
            table.foreign("user_id_1").references("users.id");
            table.integer("user_id_2").unsigned().notNullable();
            table.foreign("user_id_2").references("users.id");
            table.timestamps(false, true);
        })
    }
    if (!(await knex.schema.hasTable("chat_room_messages"))) {
        await knex.schema.createTable("chat_room_messages", (table) => {
            table.increments();
            table.string("message");
            table.integer("chat_room_id").unsigned().notNullable();
            table.foreign("chat_room_id").references("chat_rooms.id");
            table.timestamps(false, true);
        })
    }
}
export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("roles")
    await knex.schema.dropTableIfExists("status")
    await knex.schema.dropTableIfExists("object_types")
    await knex.schema.dropTableIfExists("users")
    await knex.schema.dropTableIfExists("posts")
    await knex.schema.dropTableIfExists("images")
    await knex.schema.dropTableIfExists("post_records")
    await knex.schema.dropTableIfExists("chat_rooms")
    await knex.schema.dropTableIfExists("chat_room_messages")
}

