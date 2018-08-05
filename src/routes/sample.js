const express = require('express');

const { get } = require('../controllers/sample');

const router = express.Router();

router.route('/')
  .get(get);

module.exports = router;
