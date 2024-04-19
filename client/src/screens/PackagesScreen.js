import React, { useState, useEffect } from "react";
import axios from "axios";
import Package from "../components/Package";
import Loader from "../components/Loader";
import Error from "../components/Error";
import 'antd/dist/reset.css';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

function PackagesScreen() {
    const [packages, setpackages] = useState([]);
    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    const [fromdate, setfromdate] = useState()
    const [todate, settodate] = useState()
    const [duplicatepackages, setduplicatepackages] = useState([])

    const[searchkey, setsearchkey] = useState("")
    const [type, settype] = useState('all') //Initially all the packages are shown

    useEffect(() => {
        async function fetchData() {
            try {
                setloading(true);
                const response = await axios.get("/api/packages/getallpackages", {
                    baseURL: "http://localhost:5000",
                });
                const data = response.data;
                setpackages(data);
                setduplicatepackages(data);
                setloading(false);
            } catch (error) {
                seterror(true);
                console.log(error);
                setloading(false);
            }
        }
        fetchData();
    }, []);

    function filterByDate(dates) {
    const startDate = moment(dates[0].$d);
    const endDate = moment(dates[1].$d);

    setfromdate(startDate.format('DD-MM-YYYY'));
    settodate(endDate.format('DD-MM-YYYY'));

    let temppackages = []; // Initialize temppackages to null

    for (const pkg of duplicatepackages) {
        let hasOverlap = false; // Flag to track if overlap is found
        for (const booking of pkg.currentbookings) {
            const bookingFromDate = moment(booking.fromdate, 'DD-MM-YYYY');
            const bookingToDate = moment(booking.todate, 'DD-MM-YYYY');

            // Check for overlap between the selected date range and booking date range
            if (
                (startDate.isSameOrAfter(bookingFromDate) && startDate.isSameOrBefore(bookingToDate)) ||
                (endDate.isSameOrAfter(bookingFromDate) && endDate.isSameOrBefore(bookingToDate)) ||
                (bookingFromDate.isSameOrAfter(startDate) && bookingFromDate.isSameOrBefore(endDate)) ||
                (bookingToDate.isSameOrAfter(startDate) && bookingToDate.isSameOrBefore(endDate))
            ) {
                hasOverlap = true; // Set overlap flag to true
                break; // Exit the inner loop if overlap is found
            }
        }
        if (hasOverlap) {
            temppackages = []; // Set temppackages to null if overlap is found
            break; // Exit the outer loop if overlap is found
        } else {
            temppackages = duplicatepackages; // Set temppackages to duplicatepackages if no overlap is found
        }
    }

    setpackages(temppackages);
    if (temppackages.length === 0) {
            seterror(true); // Set error to true if temppackages is empty
        } else {
            seterror(false); // Set error to false if temppackages is not empty
        }
}


    function filterBySearch() {
        const temppackages = duplicatepackages.filter(pkg => pkg.name.toLowerCase().includes(searchkey.toLowerCase()));
        setpackages(temppackages);
    }

    function filterByType(e) {
        settype(e)
        if(e !== 'all'){
            const temppackages = duplicatepackages.filter(pkg => pkg.type.toLowerCase()===e.toLowerCase());
            setpackages(temppackages);
        }
        else{
            setpackages(duplicatepackages);
        }
    }

    return (
        <div className='container'>
            <div className="row mt-5 bs">
                <div className="col-md-3">
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                </div>
                <div className="col-md-5">
                    <input type="text" className="form-control" placeholder="search packages"
                    value={searchkey} onChange={(e) => {setsearchkey(e.target.value)}} onKeyUp={filterBySearch}
                    />
                </div>
                <div className="col-md-3">
                    <select className="form-control" value={type} onChange={(e) => {filterByType(e.target.value)}}>
                        <option value="all">All</option>
                        <option value="student">Student Packages</option>
                        <option value="external">External Packages</option>
                    </select>
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                {loading ? (
                    <Loader />
                ) : error ? (
                <Error message = "Apologies, the selected date range overlaps with an existing booking for the venue. Please choose different dates or contact us for assistance. Thank you for your understanding"/>
                ) : (
                    packages.map((pkg) => {
                        return (
                            <div key={pkg._id} className="col-md-9 mt-2">
                                <Package pkg={pkg} fromdate={fromdate} todate={todate} />
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}

export default PackagesScreen;