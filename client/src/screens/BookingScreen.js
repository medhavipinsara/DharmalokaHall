import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../components/Package.css';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';

function BookingScreen() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pkg, setPkg] = useState();
    const [totalAmount, setTotalAmount] = useState(0);

    const { pkgid, fromdate, todate } = useParams();

    const fromDate = moment(fromdate, 'DD-MM-YYYY');
    const toDate = moment(todate, 'DD-MM-YYYY');
    const totalDays = moment.duration(toDate.diff(fromDate)).asDays() + 1;

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await axios.post("/api/packages/getpkgbyid", {
                    baseURL: "http://localhost:5000",
                    pkgid: pkgid,
                });
                const data = response.data;
                setPkg(data);
                setTotalAmount(data.rate * totalDays);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
                console.log(error);
            }
        }
        fetchData();
    }, [pkgid, totalDays]);

    async function simulatePayment() {
        // Simulate payment processing
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ success: true, message: 'Payment successful' });
            }, 2000); // Simulate a 2-second delay for payment processing
        });
    }

    async function handlePayment() {
        try {
            setLoading(true);
            const paymentResult = await simulatePayment();
            console.log(paymentResult);
            // Proceed with booking or show success message
        } catch (error) {
            setError(true);
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='m-5'>
            {loading ? (
                <Loader />
            ) : error ? (
                <Error />
            ) : (
                <div className='row justify-content-center mt-5 bs'>
                    {/* Your booking details UI */}
                    <div className="col-md-6">
                        <h1>{pkg.name}</h1>
                        <img src={pkg.imageurls[0]} className='bigimg' alt='pkgimg'/>
                    </div>
                    {/* Payment details UI */}
                    <div className="col-md-6">
                        {/* Your payment details UI */}
                        <div style={{ textAlign: 'right' }}>
                            <h1>Amount</h1>
                            <hr />
                            <b>
                                <p>Total Days : {totalDays}</p>
                                <p>Rent per day : Rs.{pkg.rate}/=</p>
                                <p>Total Amount : Rs.{totalAmount}/=</p>
                            </b>
                        </div>
                        <div style={{ float: 'right' }}>
                            {/* Dummy payment button */}
                            <button className='btn btn-primary' onClick={handlePayment}>Pay Now (Dummy)</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BookingScreen;
