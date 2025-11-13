import { useState, useContext } from "react";
import './index.css'
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader as Loader } from 'react-spinners';
import { Authcontext } from '../Context/Authcontext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LoginPage() {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setError] = useState('');
    const [isloading, setLoading] = useState(false)


    const navigate = useNavigate();

    const { login } = useContext(Authcontext)


    const handleSubmit = async (e) => {

        e.preventDefault();




        try {

            const url = "https://campusconnect-vp4m.onrender.com/api/auth/login";
            setLoading(true)
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({ email, password }),
            }

            const response = await fetch(url, options);

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                login(data.data, data.token);

                setEmail('');
                setPassword('');
                setError('');

                toast.success('Logged in successfully ✅');
                setTimeout(() => {
                    navigate('/home');
                }, 1000);

                setLoading(false)
            } else {
                toast.error(data.message || 'Login failed ❌');
                setLoading(false)

                setError(data.message)
            }




        } catch (e) {

            console.error(e)
            setLoading(false)

            setError(e.message)
        }
    }


    return (
        <div className="loginpage-container">
            <div className="loginform">
                <form className="form-container" onSubmit={handleSubmit} >
                    <h1 className="title">CampusConnect</h1>
                    <p className="signup-text">Login to explore photos and videos from your friends.</p>
                    <input type="text" className="input-bar" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" className="input-bar" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />

                    <button type="submit" className="login-btn">
                        {isloading ? (<div className="loader-container">
                            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
                        </div>) : ('Login')}


                    </button>
                    <p className="errormesg">{errorMsg}</p>
                </form>
                <div className="signup-card">
                    <p> Don't have an account?
                        <Link to="/signup" className="link-s-l">
                            signup
                        </Link>
                    </p>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>

    )

}
export default LoginPage;