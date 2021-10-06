


exports.up = function(knex) {
    return knex.schema.alterTable("order_items", (table) => {
      // table
      //   .foreign("order_id")
      //   .references("order.id")
      //   .onDelete("CASCADE")
      //   .onUpdate("CASCADE");
    });
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('order_items')
  }


