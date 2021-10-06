const express = require('express');
const agentRoutes = require('../controllers/agent');
const authorize = require("./../middleware/auth");
const router = express.Router();

//POST => /agent/addagent => REGISTER AN AGENT
router.post('/addagent', agentRoutes.addAgent);

router.get('/:firebase_id', agentRoutes.getAgentById);

module.exports = router;