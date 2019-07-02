var express = require('express');
var router = express.Router();


/* SIS APIs sandbox */
router.get('/', (req, res, next) => {
  const data = { username: 'korawit', role: 'lecturer' };
  res.status(200)
    .json({
      status: 'success',
      data: data
    });
});

module.exports = router;
