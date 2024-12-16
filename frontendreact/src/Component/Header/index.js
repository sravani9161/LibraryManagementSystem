import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../../Images/book2.png';
import './index.css'; // Ensure you have a CSS file for styling
import Cookies from 'js-cookie';
function Header() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logout = () => {
    document.cookie = `ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    setCookie('');
    Cookies.remove("token");
    navigate('/login');
  };

  useEffect(() => {
    const cookieValue = document.cookie.split(';')[0].split('=')[1];
    setCookie(cookieValue);
    if (!cookieValue) logout();
  }, []);

  return (
    <>
      <button className="hamburger" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        ☰
      </button>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="logo">
          <h2>Library</h2>
          <img src={img} width="50" height="50" alt="Library Logo" />
        </div>
        <div className="sectiontop">
          <h2 onClick={() => navigate('/')}>Lib</h2>
          <h2 onClick={() => navigate('/additems')}>Add Items</h2>
          <h2 onClick={() => navigate('/collection')}>Add Collections</h2>
          <h2 onClick={() => navigate('/yourcollection')}>My Collections</h2>
          <h2 onClick={() => navigate('/publish')}>Publish</h2>
          <h2 onClick={() => navigate('/dashboard')}>Dashboard</h2>
        </div>
        <div className="sectiontop">
          <h2 onClick={() => navigate('/settings')}>Settings</h2>
          <h2 onClick={() => navigate('/support')}>Support</h2>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div className={`overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
    </>
  );
}

export default Header;
