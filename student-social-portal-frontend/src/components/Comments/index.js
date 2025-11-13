import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import "./index.css";
import { ClipLoader as Loader } from 'react-spinners';
function Comments({ isCommentOpen, onClose, user, id, token }) {
  const [text, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isloading, setLoading] = useState(false)

  useEffect(() => {
    if (!isCommentOpen) return;

    const fetchComments = async () => {
      try {
        setLoading(true)
        const api = `https://campusconnect-vp4m.onrender.com/api/posts/${id}`;
        const response = await fetch(api, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setComments(data.comments || []);
          setLoading(false)
        }
      } catch (err) {
        console.error("Error fetching comments:", err.message);
      }
    };

    fetchComments();
  }, [isCommentOpen, id, token]);

  const onComment = async () => {

    try {
      const api = `https://campusconnect-vp4m.onrender.com/api/posts/${id}/comment`;
      setLoading(true)
      const response = await fetch(api, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
        setComment("");
        setLoading(false)
      }
    } catch (e) {
      setLoading(false)
      console.error(e);
    }
  };

  if (!isCommentOpen) return null;


  return (
    <div className="modal-overlay">
      <div className="modal-comments-content">
        <button className="close-btn" onClick={onClose}>
          <IoCloseCircleSharp />
        </button>

        <div className="comments-container">
          {isloading ? ((<div className="loader-container">
            <Loader type="ThreeDots" color="#000000ff" height="50" width="50" />
          </div>)) : (comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            comments.map((c) => (
              <div key={c._id} className="comment-item">
                <div className="pr">
                <img
                  src={
                    c.user?.profileImage ||
                    "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612"
                  }
                  alt="user"
                  className="comment-user-img"
                />
                         <p className="comment-username">{c.user?.username}</p>
                         </div>
               
         
                 
                  <p className="comment-text">{c.text}</p>
                
              </div>
            ))
          ))}

        </div>

        <div className="comments-text-card">
          <input
            type="text"
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setComment(e.target.value)}
            className="comment-input"
          />
          <button className="add-btn" onClick={onComment}>
            <IoIosSend />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comments;
