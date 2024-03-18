import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../components/Package.css';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';

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

    async function bookPackage(){
        const bookingDetails = {
            pkg,
            userid:JSON.parse(localStorage.getItem('currentUser'))._id,
            fromdate,
            todate,
            totalamount,
            totaldays
        }

        try {
            const result = (await axios.post('/api/bookings/bookpkg', bookingDetails))
        } catch (error) {
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
                                <button className='btn btn-primary' onClick={bookPackage}>Pay Now</button>
                            </div>
                        </div> 
                    </div>
                )
            }
        </div>
    );
}

export default BookingScreen

