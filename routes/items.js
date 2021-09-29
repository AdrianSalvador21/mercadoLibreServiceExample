
const { Router } = require('express');
const router = Router();
const { itemsGet, itemsGetSegment } = require('../controllers/items');

router.get('/', itemsGet);
router.get('/:id', itemsGetSegment);

module.exports = router;
