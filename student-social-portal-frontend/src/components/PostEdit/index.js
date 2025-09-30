import { useEffect, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import './index.css'

function PostEdit({ isOpen, onClose, id, caption, image, token ,onUpdate}) {
   
    const [newCaption, setNewCaption] = useState(caption || "");
    const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setNewCaption(caption); 
    }
  }, [isOpen, caption]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const api = `http://localhost:5000/api/posts/update/${id}`;
      const response = await fetch(api, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ caption: newCaption }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Updated:", data);
        onUpdate(data.post); 
        onClose();
      } else {
        alert(data.message);
      }
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Edit Post</h3>
                <button className="close-btn" onClick={onClose}><IoCloseCircleSharp

                /></button>

                <textarea className='post-textarea' value={newCaption}
          onChange={(e) => setNewCaption(e.target.value)} ></textarea>
                {image && <div className='post-img'>
                    <img src={image} alt="post img preview" style={{ width: '200px', opacity: '0.6' }} />


                </div>}

                <button className="save-post-btn"  onClick={handleSave} disabled={loading}>Save Post</button>

            </div>
        </div>
    )
}
export default PostEdit