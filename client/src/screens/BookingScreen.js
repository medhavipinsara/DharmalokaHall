import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../components/Package.css';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import swal from 'sweetalert2'

function BookingScreen() {
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [pkg, setpkg] = useState();

    const { pkgid , fromdate , todate } = useParams();

    const fromDate = moment(fromdate , 'DD-MM-YYYY');
    const toDate = moment(todate , 'DD-MM-YYYY');
    
    //Calculating the total dates
    const totaldays = moment.duration(toDate.diff(fromDate)).asDays() + 1;
    const [totalamount, settotalamount] = useState()
    

    useEffect(() => {

        //If the user has not logged in, the user will be redirected to login page
        if(!localStorage.getItem('currentUser')){
            window.location.href='/login'
        }
        async function fetchData() {
            try {
                setloading(true);
                const response = await axios.post("/api/packages/getpkgbyid", {
                    baseURL: "http://localhost:5000",
                    pkgid : pkgid,
                });
                const data = response.data;
                setpkg(data);
                settotalamount(data.rate * totaldays);
                setloading(false);
            } catch (error) {
                setloading(false);
                seterror(true);
                console.log(error);
            }
        }
        fetchData();
    }, [pkgid, totaldays]);

    async function onToken(token) {
        console.log(token);

        const bookingDetails = {
            pkg,
            userid:JSON.parse(localStorage.getItem('currentUser'))._id,
            token : token,
            fromdate,
            todate,
            totalamount,
            totaldays
        }

        try {
            setloading(true)
            const result = await axios.post('/api/bookings/bookpkg', bookingDetails).data
            //console.log(result.data);
            setloading(false)
            swal.fire('Congratulations!' , 'You have successfully booked the Hall' , 'success').then(result =>{
                window.location.href = '/profile';
            })
        } catch (error) {
            setloading(false)
            swal.fire('Oops!', 'Something went wrong', 'error')
            console.log(error);
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
                        <div className="col-md-6">
                            <h1>{pkg.name}</h1>
                            <img src={pkg.imageurls[0]} className='bigimg' alt='pkgimg'/>
                        </div> 
                        <div className="col-md-6">
                            <div style={{textAlign: 'right'}}>
                                <h1>Booking Details</h1>
                                <hr />
                                <b>
                                    <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                    <p>From Date : {fromdate}</p>
                                    <p>To Date : {todate}</p>
                                </b>
                            </div>
                            <div style={{textAlign: 'right'}}>
                                <h1>Amount</h1>
                                <hr />
                                <b>
                                <p>Total Days : {totaldays}</p>
                                    <p>Rent per day : Rs.{pkg.rate}/=</p>
                                    <p>Total Amount : Rs.{totalamount}/=</p>
                                </b>
                            </div>
                            <div style={{float: 'right'}}>
                                <StripeCheckout
                                    amount={totalamount * 100} 
                                    token={onToken}
                                    currency='LKR'
                                    stripeKey="pk_test_51OpWG8BNj8nIiyC9EOQlap6DiLMplRjUvCrkDFc1eTVBlA7ymdhFAEeQ1aJvwvdYLRpV8bs6nWRngowE2ciUOain00IIbTpGG7"
                                >
                                    <button className='btn btn-primary'>Pay Now{" "}</button>

                                </StripeCheckout>

                            </div>
                        </div> 
                    </div>
                )
            }
        </div>
    );
}

export default BookingScreen