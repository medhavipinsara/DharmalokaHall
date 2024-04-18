const express = require('express');
const router = express.Router();
const Resource = require('../models/resource');

// GET current inventory
router.get('/getallresources', async (req, res) => {
    try {
        const resources = await Resource.find();
        res.send( resources );
    } catch (err) {
        return res.status(400).json({ message: error });
    }
});

// Update inventory quantity
router.put('/resources/update', async (req, res) => {
    const { resourceName, newQuantity } = req.body;
    try {
        // Find the resource by ID and update its quantity
        const resource = await Resource.findByIdAndUpdate(resourceName, { quantity: newQuantity });
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.json({ message: 'Resource quantity updated successfully' });

    } catch (err) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;