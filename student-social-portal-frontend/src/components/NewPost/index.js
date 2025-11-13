import { useContext, useState } from 'react';
import './index.css'
import { FaImage } from "react-icons/fa"
import { Authcontext } from '../Context/Authcontext';
import { ClipLoader as Loader } from 'react-spinners';
import post from './post.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function NewPost() {

    const [postText, setText] = useState('');
    const [image, setImage] = useState(null);
    const [imgPreview, setImg] = useState('');
    const { user, token } = useContext(Authcontext)
    const [isloading, setLoading] = useState(false)


    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            setImg(URL.createObjectURL(file))
            setImage((file))

        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData();
        formData.append('caption', postText)
        if (image) {
            formData.append('image', image)
        }

        try {
            const api = "https://campusconnect-vp4m.onrender.com/api/posts/"
            const response = await fetch(api, {
                method: 'POST',
                headers: {

                    Authorization: `Bearer ${token}`,
                },
                body: formData
            });
            const data = await response.json()

            if (response.ok) {
                console.log(data)
                toast.success('Post Created successfully ✅'); 
                setText(" ");
                setImage(null);
                setImg('')
                setLoading(false)
            }
            else{
                alert(data.message)
                setLoading(false)
            }

        } catch (e) {
            console.log(e.message)
            setLoading(false)
        }
    }


    return (
        <div className="newpost-container">

            

            <form className='post-card' onSubmit={handleSubmit}>
                <h2 className="title3">Create new post</h2>
                <h3 className='post-title'>{user.fullname}</h3>

                <div className='post-area'>

                    <textarea className='post-textarea' placeholder='What do  you want to talk about?' value={postText} onChange={(e) => setText(e.target.value)}></textarea>

                    {imgPreview && <div className='post-img'>
                        <img 
                            src={imgPreview} 
                            alt="User selected image preview for new post, displayed above the post creation area in a friendly and inviting interface" 
                            style={{ width: '200px' }} 
                        />
                    </div>}

                    <input type="file" style={{ display: "none" }} accept="image/*" onChange={handleChange} id="profileImg" />
                    <br />
                    <label htmlFor='profileImg' className='select-image'>
                        <FaImage />
                    </label>

                </div>
                <button className='post-btn' type='submit' >

                    {isloading ? (<div className="loader-container">
                        <Loader type="ThreeDots" color="#ffffff" height="30" width="30" />
                    </div>) : ('Post')}
                </button>

            </form>
            <img 
                src={post}
                alt="CampusConnect post image shown below the post creation form in a welcoming student social portal environment" 
                className='post-image' 
            />
        </div>
    )

}
export default NewPost;