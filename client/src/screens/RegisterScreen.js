import React, {useState , useEffect} from 'react'
import axios from 'axios';
import './RegisterLogin.css'
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from '../components/Success';
import { Link } from 'react-router-dom';

function RegisterScreen() {
    const[name, setname] = useState('');
    const[email, setemail] = useState('');
    const[password, setpassword] = useState('');
    const[cpassword, setcpassword] = useState('');

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    async function register(){
        if(password === cpassword){
            const user = {
                name,
                email,
                password,
                cpassword
            }
            try {
                setloading(true);
                const result = await axios.post('api/users/register', user).data
                setloading(false);
                setsuccess(true);

                //Emptying the text fields after successful registration
                setname('');
                setemail('');
                setpassword('');
                setcpassword('');

            } catch (error) {
                console.log(error);
                setloading(false);
                seterror(true);
            }
        }
        else{
            alert('Passwords do not match')
        }
    }

    return (
        <div>
            {loading && (<Loader/>)}
            {error && (<Error/>)}
            <div className='row justify-content-center mt-5'>
                <div className="col-md-5 mt-5">
                    {success && (<Success message='Registration Success' />)}
                    <div className='bs'>
                        <h2>Register</h2>

                        <input type='text' className='form-control' placeholder='Name' 
                        value={name} onChange={(e) => {setname(e.target.value)}}/>

                        <input type='text' className='form-control' placeholder='Email'
                        value={email} onChange={(e) => {setemail(e.target.value)}}/>

                        <input type='text' className='form-control' placeholder='Password'
                        value={password} onChange={(e) => {setpassword(e.target.value)}}/>
                        
                        <input type='text' className='form-control' placeholder='Confirm Password'
                        value={cpassword} onChange={(e) => {setcpassword(e.target.value)}}/>

                        <button className='btn btn-primary mt-3' onClick={register}>Register</button>

                        <p className="mt-3">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen
