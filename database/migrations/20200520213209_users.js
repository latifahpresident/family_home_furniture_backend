
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', users => {
        users.increments().primary();
        users.string('email').notNullable().unique();
        users.string('firebase_id').notNullable().unique();
        users.string('first_name').notNullable();
        users.string('last_name').notNullable();  
        users.string('address');
        users.string('city');
        users.string('state');
        users.string('zip');
        users.string('phone');
        users.boolean('admin').defaultTo(false);
        users.boolean('agent').defaultTo(false);
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
  };
