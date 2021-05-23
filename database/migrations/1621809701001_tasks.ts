import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Tasks extends BaseSchema {
  protected tableName = "tasks";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().notNullable();
      table.string("title").notNullable();
      table.string("content").nullable();
      table.boolean("is_completed").defaultTo(0);
      table.dateTime("created_at");
      table.dateTime("updated_at");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
