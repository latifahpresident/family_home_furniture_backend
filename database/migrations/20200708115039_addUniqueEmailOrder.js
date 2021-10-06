
exports.up = function(knex) {
    return knex.schema.table('order', function (table) {
        table.dropColumn('customer_email');
        table.string('email').unique();
       
      })
};

exports.down = function(knex) {
  
};
