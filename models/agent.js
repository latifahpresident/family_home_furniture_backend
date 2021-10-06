const db = require("./../dbconfig");

addAgent = (agent) => {
    return db('agents').insert(agent)
};

agentById = (firebase_id) => {
    return db('agents').select('cash_app_name', 'commision', 'agent_id').where({ 'agent_id': firebase_id }).first();
};

deleteAgent = (id) => {
    return db('agents').where({'agent_id': id}).delete()
};

editAgent = (agent, id) => {
    return db('agents').where({'agent_id': id}).update(agent) 
};

module.exports = {
    addAgent,
    agentById,
    deleteAgent,
    editAgent,
};