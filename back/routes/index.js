const express = require('express');
const api = require('./api');
const path = require('path');

const router = express.Router();

router.use('/api', api);

router.get('*',  (req, res) => {
  return res.sendFile(
    path.join( __dirname, '../../client-build/index.html')
  );
})

module.exports = router;