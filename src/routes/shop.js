const express = require('express');

// Router object
const router = express.Router();

//Aqui podemos realizar el sistema de rutas
router.get('/', (req, res) => {
  return res.json({
    data: 'hola'
  })
});

module.exports = router;
