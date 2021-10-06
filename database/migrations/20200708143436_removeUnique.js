
exports.up = function(knex) {
    return knex.schema.table("order_items", table => {
        table.dropForeign("customer_email");

    })
};

exports.down = function(knex) {
    return knex.schema.table("order_items", table => {
        table.dropForeign("customer_email");

    })
};
