
exports.up = function(knex, Promise) {
    return knex.schema.createTable('agents', agent => {
        agent.increments();
        agent.string('agent_id').unsigned().notNullable().references('firebase_id').inTable('users').unique().onUpdate('CASCADE').onDelete('CASCADE');
        agent.float('commision').defaultTo(0.00);
        agent.string('cash_app_name');
  
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('agents')
  };
