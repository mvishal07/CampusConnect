import { useState } from "react";
import './index.css'
import { Link } from "react-router-dom";
import { ClipLoader as Loader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignupPage() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [branch, setBranch] = useState("");
    const [bio, setBio] = useState("");
    const [imgfile, setFile] = useState(null)
    const [isloading, setLoading] = useState(false)
    const [errormsg, setErrormsg] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('branch', branch);
        formData.append('bio', bio);
        if (imgfile) {
            formData.append('profileImage', imgfile);
        }

        try {
            const api = 'https://campusconnect-vp4m.onrender.com/api/auth/sign'
            setLoading(true)
            const response = await fetch(api, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();


            if (response.ok) {

                toast.success('Successfully Created'); 
                setFullname('');
                setEmail('');
                setBio('');
                setBranch('');
                setUsername('');
                setFile(null);
                setPassword('');
                    setLoading(false)
                
            }
            else {
                toast.error(data.message || 'Signup failed ❌');
                setErrormsg(data.message)
                setLoading(false)
                console.log(data.message)
            }

        } catch (e) {
            console.error("Error submitting the form: ", e.message);
            setLoading(false);
            setErrormsg("Error submitting the form",e.message)
        }
    }


    return (
        <div className="loginpage-container">
            <div className="loginform">
                <form className="form-container-signup" onSubmit={handleSubmit} >
                    <h1 className="title">CampusConnect</h1>
                    <p className="signup-text">Sign up to see photos and videos from your friends.</p>
                    <input type="text" className="input-bar" placeholder="Full Name" onChange={(e) => setFullname(e.target.value)} required />
                    <input type="email" className="input-bar" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" className="input-bar" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />

                    <input type="text" className="input-bar" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />

                    <select
                        className="input-bar"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                    >
                        <option value="" disabled>
                            Select Branch
                        </option>
                        <option value="Computer Science & Engineering">
                            Computer Science & Engineering
                        </option>
                        <option value="Electronics & Communication Engineering">
                            Electronics & Communication Engineering
                        </option>
                        <option value="Civil Engineering">
                            Civil Engineering
                        </option>
                        <option value="Mechanical Engineering">
                            Mechanical Engineering
                        </option>
                        <option value="Information Technology">
                            Information Technology
                        </option>
                        <option value="AIML">
                            AIML
                        </option>
                    </select>

                    <textarea className="input-bar" placeholder="Bio" onChange={(e) => setBio(e.target.value)}  />

                    <input type="file" onChange={(e) => setFile(e.target.files[0])} className="input-bar" placeholder="choose Image" />

                    <button type="submit" className="login-btn"> {isloading ? (<div className="loader-container">
                        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
                    </div>) : ('Sigup')}
                    </button>
                    <p className="err-msg">{errormsg}</p>
                </form>
                <div className="signup-card">
                    <p> Have an account?

                        <Link to="/" className="link-s-l"> Login </Link>

                    </p>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />    
        </div>
    )

}
export default SignupPage;