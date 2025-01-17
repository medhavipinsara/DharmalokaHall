import React, {useState , useEffect} from 'react'
import axios from 'axios';
import './RegisterLogin.css'
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Link } from 'react-router-dom';

function LoginScreen() {

    const[email, setemail] = useState('');
    const[password, setpassword] = useState('');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    async function login(){
        const user = {
            email,
            password
        }
        
        try {
            setloading(true);
            const response = await axios.post('api/users/login', user);
            const result = response.data
            setloading(false);

            //To store the user in the local storage to access it in anywhere else
            localStorage.setItem('currentUser', JSON.stringify(result));
            window.location.href = '/home';

        } catch (error) {
            console.log(error);
            setloading(false);
            seterror(true);
        }
    }

    return (
        <div>
            {loading && <Loader />}
            <div className='row justify-content-center mt-5'>
                <div className="col-md-5 mt-5">
                    {error && <Error message = 'Invalid Credentials'/>}
                    <div className='bs'>
                        <h2>Login</h2>

                        <input type='text' className='form-control' placeholder='Email'
                        value={email} onChange={(e) => {setemail(e.target.value)}}/>

                        <input type='password' className='form-control' placeholder='Password'
                        value={password} onChange={(e) => {setpassword(e.target.value)}}/>

                        <button className='btn btn-primary mt-3' onClick={login}>Login</button>

                        <p className="mt-3">
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen
