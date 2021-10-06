

exports.up = function(knex, Promise) {
    return knex.schema.createTable('order_items', order => {
        order.increments();
        order.string('customer_email').unsigned().references('email').inTable('order').onUpdate('CASCADE').onDelete('CASCADE');
        order.integer('product_id').unsigned().notNullable().references('id').inTable('products').onUpdate('CASCADE').onDelete('CASCADE');
        order.integer('quantity').defaultTo(0);
        order.float('price').unsigned().notNullable();
        order.integer('color_id').references('id').inTable('colors');;
        order.integer('image_id').references('id').inTable('images');;


    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('order_items')
  };

