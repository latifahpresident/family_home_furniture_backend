require('dotenv').config();
const server = require('./app');
const PORT = process.env.PORT || 5000
console.log(process.env.PORT)
server.listen(PORT, () => console.log(`server listening on ${PORT}`));