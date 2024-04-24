import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Tabs } from 'antd';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';
import { Divider, Flex, Tag } from 'antd';

const { TabPane } = Tabs;

function ProfileScreen() {

    const user = JSON.parse(localStorage.getItem("currentUser"));

    //Only Logged in users can see the profile screen
    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }
    })

    return (
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey='1'>
                <TabPane className='custom-tab' tab='Profile' key="1">
                    <h1>My Profile</h1>
                    <br />
                    <h1>Name : {user.name}</h1>
                    <h1>Email : {user.email}</h1>
                    <h1>isAdmin : {user.isAdmin ? 'YES' : 'NO'}</h1>
                </TabPane>
                <TabPane tab='Bookings' key="2">
                    <MyBookings />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default ProfileScreen

export function MyBookings() {

    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [bookings, setBookings] = useState([]);

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    useEffect(() => {
        async function fetchBookings() {
            try {
                setloading(true);
                const data = await (
                    await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })
                ).data;
                console.log(data)
                setBookings(data);
                setloading(false);
            } catch (error) {
                console.log(error)
                setloading(false);
                seterror(error);
            }
        }

        fetchBookings();
    }, [user._id]);

    async function cancelBooking(bookingid, pkgid) {
    const confirmCancel = await Swal.fire({
        title: 'Are you sure?',
        text: 'Once canceled, you will not be able to recover this booking!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it'
    });

    if (confirmCancel.isConfirmed) {
        try {
            setloading(true);
            const result = await axios.post("/api/bookings/cancelbooking", { bookingid, pkgid });
            console.log(result.data);
            setloading(false);
            Swal.fire('Canceled!', 'Your booking has been canceled.', 'success').then(result => {
                window.location.reload();
            });
        } catch (error) {
            console.log(error);
            setloading(false);
            Swal.fire('Oops!', 'Something went wrong.', 'error');
        }
    }
}

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    {loading && (<Loader />)}
                    {bookings && (bookings.map(booking => {
                        return (
                            <div className='bs'>
                                <h1>{booking.pkg}</h1>
                                <p><b>Booking ID :</b> {booking._id}</p>
                                <p><b>Booked from :</b> {booking.fromdate} </p>
                                <p><b>Booked to :</b> {booking.todate}</p>
                                <p><b>Amount :</b> Rs.{booking.totalamount}/=</p>
                                <p><b>Status :</b>{" "}
                                    {booking.status === 'cancelled' ? (<Tag color="red">CANCELLED</Tag>) : <Tag color="green">CONFIRMED</Tag>}
                                </p>

                                {booking.status !== 'cancelled' && (<div className='text-right'>
                                    <button className='btn btn-primary' onClick={() => { cancelBooking(booking._id, booking.pkgid) }}>Cancel Booking</button>
                                </div>)}
                            </div>
                        )
                    }))}
                </div>
            </div>
        </div>
    );
}



