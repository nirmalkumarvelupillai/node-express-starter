const router = require('express').Router();

router.use((req, res, next) => {
  
  next();
});

router.get('/', (req, res) => {
  res.json({
    message: 'About Project'
  });
});

module.exports = router;