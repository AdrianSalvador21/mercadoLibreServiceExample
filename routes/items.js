
// Router import
const { Router } = require('express');
const router = Router();

// Controllers imports
const { itemsGet, itemsGetSegment } = require('../controllers/items');

// Routes definition
router.get('/', itemsGet);
router.get('/:id', itemsGetSegment);

module.exports = router;
