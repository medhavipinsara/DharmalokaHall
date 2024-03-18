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

    // function filterByDate(dates) {
    //     const startDate = moment(dates[0].$d);
    //     const endDate = moment(dates[1].$d);
    //     // console.log(startDate.format('DD-MM-YYYY'));
    //     // console.log(endDate.format('DD-MM-YYYY'));

    //     setfromdate(startDate.format('DD-MM-YYYY'))
    //     settodate(endDate.format('DD-MM-YYYY'))

    //     var temppackages = []
    //     var availability = false

    //     for (const pkg of duplicatepackages) {
    //         if (pkg.currentbookings.length > 0) {
    //             for (const booking of pkg.currentbookings) {
    //                 if (
    //                     !moment(moment(startDate.format('DD-MM-YYYY'))).isBetween(
    //                         booking.fromdate, 
    //                         booking.todate
    //                     )
    //                     && !moment(moment(endDate.format('DD-MM-YYYY'))).isBetween(
    //                         booking.fromdate, 
    //                         booking.todate
    //                     )
    //                 ) {
    //                     if (
    //                         moment(startDate.format('DD-MM-YYYY')) !== booking.fromdate &&
    //                         moment(startDate.format('DD-MM-YYYY')) !== booking.todate &&
    //                         moment(endDate.format('DD-MM-YYYY')) !== booking.fromdate &&
    //                         moment(endDate.format('DD-MM-YYYY')) !== booking.todate
    //                     ) {
    //                         availability = true;
    //                     }
    //                 }
    //             }
    //         }
    //         if(availability === true || pkg.currentbookings.length === 0) {
    //             temppackages.push(pkg)
    //         }

    //         setpackages(temppackages)
    //     }
    // }

// function filterByDate(dates) {
//     const startDate = moment(dates[0].$d);
//     const endDate = moment(dates[1].$d);

//     setfromdate(startDate.format('DD-MM-YYYY'));
//     settodate(endDate.format('DD-MM-YYYY'));

//     var temppackages = [];
//     var availability = true; // Assuming availability is true until proven otherwise

//     for (const pkg of duplicatepackages) {
//         var hasBookingInRange = false;

//         if (pkg.currentbookings.length > 0) {
//             for (const booking of pkg.currentbookings) {
//                 const bookingFromDate = moment(booking.fromdate, 'DD-MM-YYYY');
//                 const bookingToDate = moment(booking.todate, 'DD-MM-YYYY');

//                 if (
//                     (startDate.isSameOrAfter(bookingFromDate) && startDate.isSameOrBefore(bookingToDate)) ||
//                     (endDate.isSameOrAfter(bookingFromDate) && endDate.isSameOrBefore(bookingToDate)) ||
//                     (startDate.isSameOrBefore(bookingFromDate) && endDate.isSameOrAfter(bookingToDate)) ||
//                     (bookingFromDate.isSameOrBefore(startDate) && bookingToDate.isSameOrAfter(endDate))
//                 ) {
//                     // If any booking overlaps with the selected date range, set hasBookingInRange to true
//                     hasBookingInRange = true;
//                     break; // Exit the loop as we found a booking in range
//                 }
//             }
//         }

//         if (hasBookingInRange) {
//             // If any booking found in range, mark availability as false
//             availability = false;
//         }

//         // Add the package to temppackages only if it's available
//         if (availability) {
//             temppackages.push(pkg);
//         }
//     }

//     // Set packages after checking all packages
//     setpackages(temppackages);
// }

//*************************this is the code that works for single package */
// function filterByDate(dates) {
//     const startDate = moment(dates[0].$d);
//     const endDate = moment(dates[1].$d);

//     setfromdate(startDate.format('DD-MM-YYYY'));
//     settodate(endDate.format('DD-MM-YYYY'));

//     var temppackages = [];

//     for (const pkg of duplicatepackages) {
//         var availability = true; // Assume the package is available initially

//         if (pkg.currentbookings.length > 0) {
//             for (const booking of pkg.currentbookings) {
//                 const bookingFromDate = moment(booking.fromdate, 'DD-MM-YYYY');
//                 const bookingToDate = moment(booking.todate, 'DD-MM-YYYY');

//                 // Check if any part of the selected date range overlaps with the booking date range
//                 if (
//                     startDate.isBetween(bookingFromDate, bookingToDate, null, '[]') ||
//                     endDate.isBetween(bookingFromDate, bookingToDate, null, '[]') ||
//                     bookingFromDate.isBetween(startDate, endDate, null, '[]') ||
//                     bookingToDate.isBetween(startDate, endDate, null, '[]')
//                 ) {
//                     // If any part of the selected date range overlaps with the booking date range, mark the package as unavailable
//                     availability = false;
//                     break; // Exit the loop as we found a booking in range
//                 }
//             }
//         }

//         // Add the package to temppackages only if it's available
//         if (availability) {
//             temppackages.push(pkg);
//         }
//     }

//     // Set packages after checking all packages
//     setpackages(temppackages);
// }

// function filterByDate(dates) {
//     const startDate = moment(dates[0].$d);
//     const endDate = moment(dates[1].$d);

//     setfromdate(startDate.format('DD-MM-YYYY'));
//     settodate(endDate.format('DD-MM-YYYY'));

//     var temppackages = [];

//     for (const pkg of duplicatepackages) {
//         var availability = true; // Assume the package is available initially

//         if (pkg.currentbookings.length > 0) {
//             for (const booking of pkg.currentbookings) {
//                 const bookingFromDate = moment(booking.fromdate, 'DD-MM-YYYY');
//                 const bookingToDate = moment(booking.todate, 'DD-MM-YYYY');

//                 // Check if the selected end date is after the booking's end date
//                 if (endDate.isAfter(bookingToDate)) {
//                     // If the selected date range is entirely after the booked dates, mark the package as available
//                     availability = true;
//                     break; // Exit the loop as we found that the selected date range is after the booked dates
//                 } else if (
//                     startDate.isBetween(bookingFromDate, bookingToDate, null, '[]') ||
//                     endDate.isBetween(bookingFromDate, bookingToDate, null, '[]')
//                 ) {
//                     // If any booking overlaps with the selected date range, mark the package as unavailable
//                     availability = false;
//                     break; // Exit the loop as we found a booking in range
//                 }
//             }
//         }

//         // Add the package to temppackages only if it's available
//         if (availability) {
//             temppackages.push(pkg);
//         }
//     }

//     // Set packages after checking all packages
//     setpackages(temppackages);
// }

// function filterByDate(dates) {
//     const startDate = moment(dates[0].$d);
//     const endDate = moment(dates[1].$d);

//     setfromdate(startDate.format('DD-MM-YYYY'));
//     settodate(endDate.format('DD-MM-YYYY'));

//     var temppackages = [];
//     var overallAvailability = true; // Flag to track overall availability

//     for (const pkg of duplicatepackages) {
//         var availability = true; // Assume the package is available initially

//         if (pkg.currentbookings.length > 0) {
//             for (const booking of pkg.currentbookings) {
//                 const bookingFromDate = moment(booking.fromdate, 'DD-MM-YYYY');
//                 const bookingToDate = moment(booking.todate, 'DD-MM-YYYY');

//                 // Check if the selected end date is after the booking's end date
//                 if (endDate.isAfter(bookingToDate)) {
//                     // If the selected date range is entirely after the booked dates, mark the package as available
//                     availability = true;
//                     break; // Exit the loop as we found that the selected date range is after the booked dates
//                 } else if (
//                     startDate.isBetween(bookingFromDate, bookingToDate, null, '[]') ||
//                     endDate.isBetween(bookingFromDate, bookingToDate, null, '[]')
//                 ) {
//                     // If any booking overlaps with the selected date range, mark the package as unavailable
//                     availability = false;
//                     overallAvailability = false; // Update the overall availability flag
//                     break; // Exit the loop as we found a booking in range
//                 }
//             }
//         }

//         // Add the package to temppackages only if it's available
//         if (availability) {
//             temppackages.push(pkg);
//         }
//     }

//     // Set packages after checking all packages
//     if (!overallAvailability) {
//         // If any package is unavailable, set availability of all packages to false
//         setpackages([]);
//     } else {
//         setpackages(temppackages);
//     }
// }

function filterByDate(dates) {
    const startDate = moment(dates[0].$d);
    const endDate = moment(dates[1].$d);

    setfromdate(startDate.format('DD-MM-YYYY'));
    settodate(endDate.format('DD-MM-YYYY'));

    var temppackages = [];
    var overallAvailability = true; // Assume all packages are available initially

    for (const pkg of duplicatepackages) {
        var packageAvailability = true; // Assume the package is available initially
        if (pkg.currentbookings.length > 0) {
            for (const booking of pkg.currentbookings) {
                const bookingFromDate = moment(booking.fromdate, 'DD-MM-YYYY');
                const bookingToDate = moment(booking.todate, 'DD-MM-YYYY');

                // Check if any part of the selected date range overlaps with the booking date range
                if (
                    startDate.isBetween(bookingFromDate, bookingToDate, null, '[]') ||
                    endDate.isBetween(bookingFromDate, bookingToDate, null, '[]') ||
                    bookingFromDate.isBetween(startDate, endDate, null, '[]') ||
                    bookingToDate.isBetween(startDate, endDate, null, '[]')
                ) {
                    // If any part of the selected date range overlaps with the booking date range, mark the package as unavailable
                    overallAvailability = false;
                    packageAvailability = false; // Update the package availability flag
                    break; // Exit the loop as we found a booking in range
                }
            }
        }

        // If the overall availability is already false, no need to check further packages
        if (!overallAvailability) {
            break;
        }

        // Add the package to temppackages if it's available
        if (packageAvailability) {
            temppackages.push(pkg);
        }       
    }

    // if (overallAvailability) {
    //         setpackages(packages);
    // }
    // else{
    //     setpackages(temppackages);
    // }
    
    // Set packages after checking all packages
    setpackages(temppackages);

    // Return the overall availability
    //return overallAvailability;
}

    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col-md-3">
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />

                </div>
            </div>
            <div className="row justify-content-center mt-5">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Error />
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