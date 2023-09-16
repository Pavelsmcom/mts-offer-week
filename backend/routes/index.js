const router = require('express').Router();

const { getTariffs, parseTariffs } = require('../controllers/tariffs');

router.get('/tariffs', getTariffs);
router.get('/parse', parseTariffs);
router.use('/*', (req, res) => {
  res.status(404).send('Not found');
});

module.exports = router;
