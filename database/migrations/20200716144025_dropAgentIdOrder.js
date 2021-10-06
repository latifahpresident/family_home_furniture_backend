
exports.up = function(knex) {
    return knex.schema.table("order", table => {
        // table.dropForeign("agent_id");

    })
};

exports.down = function(knex) {
    return knex.schema.table("order", table => {
        // table.dropForeign("agent_id");

    })
};
