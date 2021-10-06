
exports.up = function(knex) {
    return knex.schema.alterTable("colors", (table) => {
      table.dropForeign("product_title");
  
      table
        .foreign("product_title")
        .references("products.title")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
  }
  
  exports.down = function(knex) {
    return knex.schema.alterTable("colors", (table) => {
      table.dropForeign("product_title");
  
      table
        .foreign("product_title")
        .references("products.title")
        .onDelete("NO ACTION")
        onUpdate("NO ACTION");
    });
  }
