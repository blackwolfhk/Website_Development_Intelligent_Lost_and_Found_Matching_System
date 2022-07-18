import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("latlngs"))) {
        await knex.schema.createTable("latlngs", (table) => {
            table.increments();
            table.string("lat");
            table.string("lng");
            table.integer("post__id").unsigned().notNullable();
            table.foreign("post__id").references("posts.id");
            table.timestamps(false, true);
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("latlngs")
}

