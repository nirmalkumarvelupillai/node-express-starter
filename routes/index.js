const router = require('express').Router();

const about = require('./about');

router.use((req, res, next) => {
  
  next();
});

router.get('/', (req, res) => {
  res.json({
    message: 'Starter Project'
  });
})

router.use('/about', about)

module.exports = router;