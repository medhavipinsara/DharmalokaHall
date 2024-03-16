const express = require('express');
const router = express.Router();
const Package = require('../models/package'); // Updated import statement

// Get all halls
router.get('/getallpackages', async (req, res) => {
  try {
    const packages = await Package.find({})
    res.send( packages );
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
