const express = require('express');
const router = express.Router();
const Package = require('../models/package'); // Updated import statement

// Get all packages
router.get('/getallpackages', async (req, res) => {
  try {
    const packages = await Package.find({})
    res.send( packages );
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

//post package by id
router.post('/getpkgbyid', async (req, res) => {

  const pkgid = req.body.pkgid;

  try {
    const pkg = await Package.findOne({ _id: pkgid});
    res.send( pkg );
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
