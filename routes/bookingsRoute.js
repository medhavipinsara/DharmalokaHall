const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Package = require('../models/package');
const { model } = require('mongoose');
const moment = require('moment');

router.post('/bookpkg', async(req, res) => {
    const {pkg,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays
    } = req.body;

    try {
        const newbooking = new Booking({
            pkg : pkg.name,
            pkgid : pkg._id,
            userid,
            fromdate : moment(fromdate , 'DD-MM-YYYY').format('DD-MM-YYYY'),
            todate : moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
            totalamount,
            totaldays,
            transactionid : '1234'
        })

        const booking = await newbooking.save()

        const pkgtemp = await Package.findOne({_id : pkg._id})

        pkgtemp.currentbookings.push({
            bookingid : booking._id , 
            fromdate : moment(fromdate , 'DD-MM-YYYY').format('DD-MM-YYYY'), 
            todate : moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
            userid : userid,
            status : booking.status
        })

        await pkgtemp.save()

        res.send('Package Booked Successfully')
    } catch (error) {
        return res.status(400).json({error})
        console.log(error)
    }
});

module.exports = router;