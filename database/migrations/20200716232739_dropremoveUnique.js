
exports.up = function(knex) {
    return knex.schema.table("order_items", table => {
        // table.dropColumn('customer_email')

    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('dropremoveUnique')

};
