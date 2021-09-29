const express = require('express');
const cors = require('cors');

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
   this.app.use(this.itemsRoutePath, require('../routes/items'));
  }

  listen() {
    this.app.listen(this.port, () => {
      // app running
    });
  }

  middlewares() {
    // cors
    this.app.use(cors());
    // data json serializer
    this.app.use(express.json());
    // public directory
    this.app.use(express.static('public'));
  }
}

module.exports = Server;
