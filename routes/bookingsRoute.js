const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Package = require('../models/package');
const { model } = require('mongoose');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51OwNhBSBSujpPujhxDM1KQ7qSw0X7pU2ZQx1JNGQR92cMvYXYJWxJLizaIskWA60tYLjTwGErj8kBgp17NXDYTDl00GRaD5MXW');

router.post('/bookpkg', async (req, res) => {
    const { pkg,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token } = req.body;


    try {
        const customer = await stripe.customers.create(
            {
                email: token.email,
                source: token.id
            }
        )

        const payment = await stripe.charges.create(
            {
                amount: totalamount * 100,
                customer: customer.id,
                currency: 'LKR',
                receipt_email: token.email
            },
            {
                idempotencyKey: uuidv4()
            }
        )

        if (payment) {


                const newbooking = new Booking({
                    pkg: pkg.name,
                    pkgid: pkg._id,
                    userid,
                    fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
                    todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
                    totalamount,
                    totaldays,
                    transactionid: '1234'
                })

                const booking = await newbooking.save()

                const pkgtemp = await Package.findOne({ _id: pkg._id })

                pkgtemp.currentbookings.push({
                    bookingid: booking._id,
                    fromdate: moment(fromdate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
                    todate: moment(todate, 'DD-MM-YYYY').format('DD-MM-YYYY'),
                    userid: userid,
                    status: booking.status
                })

                await pkgtemp.save()

      
            
        }
        res.send('Payment Successful, Your package and the hall is booked')

    } catch (error) {
        return res.status(400).json({ error })
    }

});

module.exports = router;