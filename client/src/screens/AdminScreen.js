import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import swal from 'sweetalert2'

const { TabPane } = Tabs;

//Main Admin Screen
function AdminScreen() {

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('currentUser')).isAdmin) {
            window.location.href = '/home';
        }
    }, [])

    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h1 className='text-center'><b>Admin Panel</b></h1>
            <Tabs defaultActiveKey='1'>
                <TabPane tab='Bookings' key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab='Packages' key="2">
                    <Packages />
                </TabPane>
                <TabPane tab='Add Packages' key="3">
                    <Addpkg /> 
                </TabPane>
                <TabPane tab='Users' key="4">
                    <Users />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default AdminScreen


//Displaying All Bookings in the Admin-frontend
export function Bookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    useEffect(() => {
        async function fetchBookings() {
            try {
                const data = await (
                    await axios.get('/api/bookings/getallbookings')
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
    }, []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Bookings</h1>
                {loading && <Loader />}

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Booking ID</th>
                            <th>User ID</th>
                            <th>Package</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length && (bookings.map(booking => {
                            return (
                                <tr>
                                    <td>{booking._id}</td>
                                    <td>{booking.userid}</td>
                                    <td>{booking.pkg}</td>
                                    <td>{booking.fromdate}</td>
                                    <td>{booking.todate}</td>
                                    <td>{booking.status}</td>
                                </tr>
                            )
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

//Displaying all the Packages in the Admin-frontend
export function Packages() {

    const [packages, setPackages] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    useEffect(() => {
        async function fetchPackages() {
            try {
                const data = await (
                    await axios.get('/api/packages/getallpackages')
                ).data;
                console.log(data)
                setPackages(data);
                setloading(false);
            } catch (error) {
                console.log(error)
                setloading(false);
                seterror(error);
            }
        }

        fetchPackages();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Packages</h1>
                {loading && <Loader />}

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>Package ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent Per Day</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packages.length && (packages.map(pkg => {
                            return (
                                <tr>
                                    <td>{pkg._id}</td>
                                    <td>{pkg.name}</td>
                                    <td>{pkg.type}</td>
                                    <td>{pkg.rate}</td>
                                    <td>{pkg.description}</td>
                                </tr>
                            )
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


//Displaying All Users in the Admin-frontend
export function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    useEffect(() => {
        async function fetchUsers() {
            try {
                const data = await (
                    await axios.get('/api/users/getallusers')
                ).data;
                console.log(data)
                setUsers(data);
                setloading(false);
            } catch (error) {
                console.log(error)
                setloading(false);
                seterror(error);
            }
        }
        fetchUsers();
    }, []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h1>Users</h1>
                {loading && <Loader />}

                <table className='table table-bordered table-dark'>
                    <thead className='bs'>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && (users.map(user => {
                            return (
                                <tr>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                </tr>
                            )
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

//Add Package Component
export function Addpkg() {

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    const[name, setname] = useState('')
    const[rate, setrate] = useState()
    const[type, settype] = useState('')
    const[description, setdescription] = useState('')
    const[includes, setincludes] = useState('')
    const[features, setfeatures] = useState('')
    const[requirements, setrequirements] = useState('')
    const[imageurl1, setimageurl1] = useState('')
    const[imageurl2, setimageurl2] = useState('')
    const[imageurl3, setimageurl3] = useState('')

    async function addPackage(){
        const newpkg = {
            name,
            rate,
            type,
            description,
            includes,
            features,
            requirements,
            imageurls:[imageurl1, imageurl2, imageurl3]
        }

        try {
            setloading(true);
            const result = (await axios.post('/api/packages/addpkg', newpkg)).data
            console.log(result)
            setloading(false);
            swal.fire('Congrats!', 'Your New Package Added Successfully', 'success').then(result =>{
                window.location.href='/home'
            })
        } catch (error) {
            console.log(error)
            setloading(false);
            swal.fire('Oops!', 'Something went Wrong', 'error')
        }
    }

    return (
        <div className='row'>
            <div className='col-md-5'>
                {loading && <Loader />}
                <input type='text' className='form-control' placeholder='package name'
                value={name} onChange={(e)=>{setname(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='rent per day'
                value={rate} onChange={(e)=>{setrate(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='type'
                value={type} onChange={(e)=>{settype(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='image URL 1'
                value={imageurl1} onChange={(e)=>{setimageurl1(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='image URL 2'
                value={imageurl2} onChange={(e)=>{setimageurl2(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='image URL 3'
                value={imageurl3} onChange={(e)=>{setimageurl3(e.target.value)}}
                />

                
            </div>
            <div className='col-md-5'>
                <input type='text' className='form-control' placeholder='description'
                value={description} onChange={(e)=>{setdescription(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='includes'
                value={includes} onChange={(e)=>{setincludes(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='additional features'
                value={features} onChange={(e)=>{setfeatures(e.target.value)}}
                />
                <input type='text' className='form-control' placeholder='booking requirements'
                value={requirements} onChange={(e)=>{setrequirements(e.target.value)}}
                />

                <div className='text-right'>
                    <button className='btn btn-primary mt-5' onClick={addPackage}>Add Package</button>
                </div>
            </div>
        </div>
    )
}


