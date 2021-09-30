require('dotenv').config();

// Server instance is created
const Server = require('../models/server');
const server = new Server();

// Server initialized
server.listen();
