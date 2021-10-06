
exports.up = function(knex) {
  return knex.schema.createTable('colors', color => {
      color.increments();
      color.string('name')
      color.string('product_title').references('title').inTable('products').onUpdate('CASCADE').onDelete('CASCADE');;
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('colors');
};
