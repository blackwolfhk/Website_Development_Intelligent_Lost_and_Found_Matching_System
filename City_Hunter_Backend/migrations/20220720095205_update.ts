import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    if (!(await knex.schema.hasTable("districts"))) {
        await knex.schema.createTable("districts", (table) => {
            table.increments();
            table.string("name");
            table.timestamps(false, true);
        })
    }
    if (await knex.schema.hasTable("posts")) {
        await knex.schema.alterTable("posts", (table) => {
            table.integer("district_id").unsigned().notNullable();
            table.foreign("district_id").references("districts.id");
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    if (await knex.schema.hasTable("posts")) {
        await knex.schema.alterTable("posts", (table) => {
            table.dropColumn("district_id");
        });
    }
    await knex.schema.dropTableIfExists("districts")

}

