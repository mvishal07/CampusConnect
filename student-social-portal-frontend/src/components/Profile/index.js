import { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { MdGridOn } from "react-icons/md";

import { FaRegCommentAlt } from "react-icons/fa";
import { useContext } from 'react';
import { CiEdit } from "react-icons/ci";
import { Authcontext } from '../Context/Authcontext'
import { FcLike } from 'react-icons/fc';
import { ClipLoader as Loader } from 'react-spinners';
import { MdDelete } from "react-icons/md";
import PostEdit from '../PostEdit';
function Profile() {
    const [isloading, setLoading] = useState(false)
    const { user, token } = useContext(Authcontext);
    const [posts, setPosts] = useState([]);
    const [isOpen, setOpen] = useState(false)
    const [selectedPost, setSelectedPost] = useState('')
    useEffect(() => {
        
        const getProfilePosts = async () => {
            let id = user._id
            setLoading(true)
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
                console.log(data)
                setLoading(false)
            }
        }
        if (token) {
            getProfilePosts();
        }
    }, [token])


    const deletePost = async (id) => {
        const api = `http://localhost:5000/api/posts/${id}`

        const response = await fetch(api, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (response.ok) {
            const data = await response.json()

            setPosts((prev) => prev.filter((each) => each._id !== id));
            console.log(data)
        }
    }

    const handleEditPost = (id) => {
        setOpen(true);
        setSelectedPost(id);
    };

    let count = posts?.length || 0

    return (

        <div className='profile-page'>
            <div className='profile-head'>
                <div className='profile-img'>

                    <div className="profile-ring">
                        {(user) ? (
                            <img src={user.profileImage
                            } alt="Profile" className="profile-img" loading="lazy"  />
                        ) : (
                            <div className="placeholder"><IoMdAdd /></div>
                        )}
                    </div>

                </div>

                <div className="profile-details">
                    <h2 className='username'>{user.username}</h2>
                    <p className='branch'>{user.branch}</p>
                    <p>{user.bio}</p>
                    <p className='post-count'><span className='count'>{count}</span> Posts</p>

                </div>
            </div>

            <div className='posts-container'>
                <MdGridOn className='icon' />
                <br />
                <hr />
                
                {isloading ? (<div className="loader-container">
                    <Loader type="ThreeDots" color="#000000ff" height="50" width="50" />
                </div>) : (
                    posts.map((each) => (
                        <div className='posts-card' key={each._id}>
                            <div className='post-head'>
                                <button className='action-btn' onClick={() => handleEditPost(each._id)} ><CiEdit />Edit</button>
                                <button className='action-btn' onClick={() => deletePost(each._id)} ><MdDelete />Delete</button>
                            </div>
                            {

                                <PostEdit
                                    isOpen={isOpen && selectedPost === each._id}
                                    onClose={() => setOpen(false)}
                                    caption={each.caption}
                                    image={each.image}
                                    id={each._id}
                                    token={token}
                                    onUpdate={(updatedPost) => {
                                        setPosts((prev) =>
                                            prev.map((post) => (post._id === updatedPost._id ? updatedPost : post))
                                        );
                                    }}
                                />

                            }

                            <div className='content-card'>
                                <p>
                                    {each.caption}
                                </p>
                                {each.image && (
                                    <img src={each.image} className='postimg' loading="lazy" alt="post-image" />
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
                    ))
                )}
             




            </div>
        </div>
    )

}
export default Profile
