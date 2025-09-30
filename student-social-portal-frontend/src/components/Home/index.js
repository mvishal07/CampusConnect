import './index.css'
import { MdHome } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import Profile from '../Profile';
import NewPost from '../NewPost';
import { useState } from 'react';
import Posts from '../Posts';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { Authcontext } from '../Context/Authcontext';
const Home = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { user, logout } = useContext(Authcontext)
  const navigate = useNavigate();
  const [isloading, setLoading] = useState(false)
  const logoutBtn = () => {
    logout();

    toast.success('successfully logout✅');
    setTimeout(() => {
      navigate('/');
    }, 1200);
  }

  return (
    <div className="home-container">
      <aside className="navigation-bar">
        <div className="navigation-head">
          <h2 className="title2">CampusConnect</h2>
        </div>
        <ul className='navigation-links'>
          <li
            className={`link-item ${activeTab === "home" ? "active" : ""}`}
            onClick={() => setActiveTab("home")}
          >
            <MdHome className='icons' /> Home
          </li>

          <li
            className={`link-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <CgProfile className='icons' /> Profile
          </li>

          <li
            className={`link-item ${activeTab === "post" ? "active" : ""}`}
            onClick={() => setActiveTab("post")}
          >
            <RiImageAddFill className='icons' /> Post
          </li>

          <li
            className={`link-item ${activeTab === "logout" ? "active" : ""}`}
            onClick={logoutBtn}
          >
            <LuLogOut className='icons' /> Logout
          </li>
        </ul>
        <div className='user-details'>

          <img src={user?.profileImage || ''} alt="Profile" className="profile-picture" />
          <div>
            <p className="post-username">{user?.fullname}</p>
            <p className='dept'>{user?.branch}</p>
          </div>

        </div>
      </aside>

      <main className="main-content">
        {activeTab === 'profile' && <Profile />}

        {activeTab === 'post' && <NewPost />}
        {activeTab === 'home' && (
          <>
            <div>
              <Posts />
            </div>
          </>
        )}
      </main>

      <div className='navigation-bar-min'>
        <ul className='navigation-links-min'>
          <li className='link-item-min' onClick={() => setActiveTab("home")}><MdHome className='icons' /> </li>
          <li className='link-item-min' onClick={() => setActiveTab("profile")}><CgProfile className='icons' /> </li>
          <li className='link-item-min' onClick={() => setActiveTab("post")}><RiImageAddFill className='icons' /> </li>
          <li className='link-item-min' onClick={logoutBtn}><LuLogOut className='icons' /> </li>
        </ul>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}
export default Home;
