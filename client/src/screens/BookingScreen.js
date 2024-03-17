import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../components/Package.css';

function BookingScreen() {
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [pkg, setpkg] = useState();

    const { pkgid } = useParams();

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
                setloading(false);
            } catch (error) {
                setloading(false);
                seterror(true);
                console.log(error);
            }
        }
        fetchData();
    }, [pkgid]);

    

    return (
        <div className='m-5'>

            {/* <h1>Booking Screen</h1>
            <h1>Package id = {pkgid}</h1> */}

            {loading ? (
                    <h1>Loading...</h1>
                ) : error ? (
                    <h1>Error</h1>
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
                                    <p>Name : </p>
                                    <p>From Date :</p>
                                    <p>To Date :</p>
                                </b>
                            </div>
                            <div style={{textAlign: 'right'}}>
                                <h1>Amount</h1>
                                <hr />
                                <b>
                                    <p>Total Hours : </p>
                                    <p>Rent per Hour : Rs.{pkg.rate}/=</p>
                                    <p>Total Mount :</p>
                                </b>
                            </div>
                            <div style={{float: 'right'}}>
                                <button className='btn btn-primary'>Pay Now</button>
                            </div>
                        </div> 
                    </div>
                )
            }

        </div>
    );
}

export default BookingScreen

