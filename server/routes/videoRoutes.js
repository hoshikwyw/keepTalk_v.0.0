const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/video-call', authMiddleware, (req, res) => {
  res.send('Video call route');
});

module.exports = router;
