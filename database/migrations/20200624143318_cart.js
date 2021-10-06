

exports.up = function(knex, Promise) {
  return knex.schema.createTable('cart', cart => {
      cart.increments();
      cart
      .string('firebase_id')
      .notNullable()
      .references('firebase_id')
      .inTable('users')
      .unique()
      .onUpdate('CASCADE') // if Article primary key is changed, update this foreign key.
      .onDelete('CASCADE')
      // cart.float('total').unsigned().defaultTo(0.00);
      // cart.integer('quantity').defaultTo(0);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cart')
};

// exports.up = function(knex, Promise) {
//     return knex.schema.createTable('cart', cart => {
//         cart.increments();
//         cart.string('firebase_id').unsigned().notNullable().references('firebase_id').inTable('users').onDelete('CASCADE');
//         cart.integer('product_id').unsigned().notNullable().references('id').inTable('products').onUpdate('CASCADE').onDelete('CASCADE');
//         cart.integer('quantity').defaultTo(0);
//         cart.float('price').unsigned().notNullable();
//         cart.string('color').references('name').inTable('colors');;


//     })
//   };
  
//   exports.down = function(knex, Promise) {
//     return knex.schema.dropTableIfExists('cart')
//   };
