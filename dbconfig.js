// const knex = require('knex')
// const knexConfig = require('./knexfile.js');
// const environment = process.env.NODE_ENV || 'development'
// const db = knex(knexConfig[environment]);

// module.exports = db;

const knex = require('knex')
const knexConfig = require('./knexfile');
const environment = process.env.NODE_ENV || 'development'
console.log(environment, 'environment')
const db = knex(knexConfig[environment]);

module.exports = db
