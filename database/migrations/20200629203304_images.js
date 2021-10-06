
exports.up = function(knex) {
    return knex.schema.createTable('images', images => {
        images.increments();
        images.string('image_url').unique();
        images.string('product_title').references('title').inTable('products').onUpdate('CASCADE').onDelete('CASCADE');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('images');
  };
