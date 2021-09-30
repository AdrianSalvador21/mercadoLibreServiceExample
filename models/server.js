const express = require('express');
const cors = require('cors');

/*
* Server class handle the main server configuration and routes
*/
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.itemsRoutePath = '/api/items';
    // Middleware
    this.middlewares();
    // Routes
    this.routes();
  }

  routes() {
    // Routes added from -> /api/items
   this.app.use(this.itemsRoutePath, require('../routes/items'));
  }

  listen() {
    this.app.listen(this.port, () => {
      // app running
    });
  }

  middlewares() {
    // cors enabled
    this.app.use(cors());
    // data json serializer
    this.app.use(express.json());
    // public directory added
    this.app.use(express.static('public'));
  }
}

module.exports = Server;
