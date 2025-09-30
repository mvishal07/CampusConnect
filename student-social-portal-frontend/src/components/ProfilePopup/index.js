
import './index.css'
import { useEffect, useState } from 'react';
import { MdGridOn } from "react-icons/md";

import { FaRegCommentAlt } from "react-icons/fa";
import { useContext } from 'react';

import { Authcontext } from '../Context/Authcontext'
import { FcLike } from 'react-icons/fc';

import { IoCloseCircleSharp } from "react-icons/io5";

function ProfilePopup({ isOpen, onClose, user }) {

    const [posts, setPosts] = useState([]);
    const { token } = useContext(Authcontext);
    
    useEffect(() => {
        let id = user._id
        const getProfilePosts = async () => {
            
            const api = `http://localhost:5000/api/posts/${id}/profile`

            const response = await fetch(api, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setPosts(data)
       
                
            }
        }
        if (token) {
            getProfilePosts();
        }
    }, [token])


    if (!isOpen || !user) return null;
    console.log(user)
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}><IoCloseCircleSharp /></button>
                <img
                    src={
                        user.profileImage ||
                        "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                    }
                    alt="profile"
                    className="modal-profile-img"
                    loading='lazy'
                />
                <h2>{user.username}</h2>
                <p className='profile-name'>{user.fullname}</p>
                <p>{user.branch}</p>
                <p>{user.bio}</p>

                <div className='posts-container'>
                    <MdGridOn className='icon' />
                    <br />
                    <hr />
                    
                    {posts.map((each) => (
                        <div className='posts-card' key={each._id}>

                            <div className='content-card'>
                                <p>
                                    {each.caption}
                                </p>
                                {each.image && (
                                    <img src={each.image} className='postimg' loading='lazy' alt="post-image" />
                                )}
                            </div>

                            <div className='actions-card'>
                                <button className='like-btn'>
                                    <FcLike />{each.likes?.length || 0}
                                </button>

                                <button className='action-btn'>
                                    <FaRegCommentAlt />{each.comments?.length || 0}
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )

}
export default ProfilePopup