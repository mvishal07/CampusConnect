import { useContext, useEffect, useState } from "react";
import { SlLike } from "react-icons/sl";
import { FaRegCommentAlt } from "react-icons/fa";
import "./index.css";
import { Authcontext } from "../Context/Authcontext";
import ProfilePopup from "../ProfilePopup";
import { FcLike } from "react-icons/fc";
import { ClipLoader as Loader } from 'react-spinners';
import Comments from "../Comments";
function Posts() {
  const { user, token } = useContext(Authcontext);
  const [posts, setPosts] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [isloading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCommentOpen, setCommentOpen] = useState(false)

  const [selectedPost, setSelectedPost] = useState(null);

  const openComments = (post) => {
    setSelectedPost(post);
    setCommentOpen(true);
  };

  const handleProfileClick = (user) => {
    setSelectedUser(user);
    setIsOpen(true);

  };

  // const handleCommentbox = (user) => {
  //   setCommentOpen(true)
  //   setSelectedUser(user);
  // }


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const api = "http://localhost:5000/api/posts";
        const response = await fetch(api, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setPosts(data);
          setLoading(false)
        } else {
          console.error("Error:", data.message);
        }
      } catch (err) {
        console.error("Fetch failed:", err.message);
        setLoading(false)
      }
    };

    if (token) {
      fetchPosts();
    }
  }, [token]);
  console.log(posts)

  //LIKE UNLIKE TOGGLE FUNCTION

const likebtn = async (id) => {
  try {
    const api = `http://localhost:5000/api/posts/${id}/like`;

    const response = await fetch(api, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

     
      setPosts((prev) =>
        prev.map((eachPost) =>
          eachPost._id === id
            ? { ...eachPost, likes: data.likes }
            : eachPost
        )
      );
    }
  } catch (err) {
    console.error("Like error:", err);
  }
};


  const toggleCaption = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  //COMMENTS HANDLER 



  return (
    <>
      {isloading ? ((<div className="loader-container-home">
        <Loader type="ThreeDots" color="#000000ff" height="50" width="50" />
      </div>)) : (
        posts.map((each) => (
          <div className="posts-card" key={each._id}>

            {/* view profile link */}

            <div className="post-head" onClick={() => handleProfileClick(each.user)} >
              <img
                src={each.user?.profileImage || 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='}
                alt="profile img"
                className="post-profile-img"
              />
              <div className="details">
                <p className="post-username">{each.user?.username}</p>
                <p className="dept">{each.user?.branch}</p>

                <p className="post-date">
                  {new Date(each.createaAt).toLocaleString()}
                </p>
              </div>
            </div>
            {isOpen && (
              <ProfilePopup
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                user={selectedUser}
              />
            )}
            {/*------- END ------- */}

            <div className="content-card">
              <p>
                {expanded[each._id]
                  ? each.caption
                  : each.caption.slice(0, 100) + "..."}
                {each.caption.length > 100 && (
                  <button
                    onClick={() => toggleCaption(each._id)}
                    style={{
                      color: "#717171ff",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "13px",
                      marginLeft: "5px",
                    }}
                  >
                    {expanded[each._id] ? "Read Less" : "Read More"}
                  </button>
                )}
              </p>
              {each.image && (
                <img src={each.image} className="postimg" alt="post" loading="lazy" />
              )}
            </div>

            <div className="actions-card">
              <button
                className='like-btn'
                onClick={() => likebtn(each._id)}
              >
                {each.likes?.includes(user._id) ? <FcLike /> : <SlLike />}
                {each.likes?.length || 0}
              </button>
              <button className="action-btn" onClick={() => openComments(each)} >
                <FaRegCommentAlt /> {each.comments?.length || 0}
              </button>
              {
                <Comments
                  isCommentOpen={isCommentOpen}
                  onClose={() => setCommentOpen(false)}
                  user={selectedUser}
                  id={selectedPost?._id}
                  token={token}
                />
              }
            </div>
          </div>
        ))
      )}

    </>
  );
}

export default Posts;
 