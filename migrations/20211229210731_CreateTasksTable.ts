import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tasks', (tableBuilder => {
        tableBuilder.increments('id').primary();
        tableBuilder.string('description', 100).notNullable();
        tableBuilder.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
        tableBuilder.enu('status', [0, 1, 2]).defaultTo(0); //0 -> Pending | 1 -> Completed | 2 -> Deleted
        tableBuilder.enu('priority', [0, 1, 2]) // 0-> High | 1 -> Normal | 2 -> Low
    }));
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('tasks');
}

