

exports.up = function(knex) {
    return knex.schema.alterTable("order_items", (table) => {
      // table.dropForeign("image_id");
      // table.dropForeign("color_id");
      // // table
      // //   .foreign("image_id")
      // //   .references("images.id")
      // //   .onDelete("CASCADE")
      // //   .onUpdate("CASCADE");
      //   table
      //   .foreign("color_id")
      //   .references("colors.id")
      //   .onDelete("CASCADE")
      //   .onUpdate("CASCADE");
    });
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('order_items')

    // return knex.schema.alterTable("order_items", (table) => {
      // table.dropForeign("image_id");
      // table.dropForeign("color_id");
      // table
      //   .foreign("image_id")
      //   .references("images.id")
      //   .onDelete("NO ACTION")
      //   onUpdate("NO ACTION");
      //   table
      //   .foreign("color_id")
      //   .references("colors.id")
      //   .onDelete("NO ACTION")
      //   onUpdate("NO ACTION");
    // });
  }

