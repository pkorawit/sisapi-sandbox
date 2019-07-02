var express = require('express');
var sis = require('../utilities/sisproxy');
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


router.get('/classschedule/:studentid/:year/:term', async (req, res) => {
  try {
    const data = await sis.getClassSchedule(req.params.studentid, req.params.term, req.params.year);
    res.status(200)
      .json({
        status: 'success',
        data: data
      });
  }
  catch (e) { 
    res.status(401)
      .json({
        status: 'error',
        data: e.message
      });
  }

});

module.exports = router;
