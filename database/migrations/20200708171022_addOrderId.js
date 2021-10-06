
exports.up = function(knex) {
    return knex.schema.table('order_items', function (table) {
        // table.integer('order_id').references('id').inTable('order');
       
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('addOrderId')

};
