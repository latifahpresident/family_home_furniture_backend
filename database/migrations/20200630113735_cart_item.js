
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cart_item', cart => {
        cart.increments();
        cart.string('cart_id').unsigned().notNullable().references('firebase_id').inTable('cart').onDelete('CASCADE');
        cart.integer('product_id').unsigned().notNullable().references('id').inTable('products').onUpdate('CASCADE').onDelete('CASCADE');
        cart.integer('quantity').defaultTo(0);
        cart.float('price').unsigned().notNullable();
        cart.integer('color_id').references('id').inTable('colors');;
        cart.integer('image_id').references('id').inTable('images');;


    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cart_item')
  };
