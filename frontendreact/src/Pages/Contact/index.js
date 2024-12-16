import './Front.css';
import img from '../../Images/book2.png';
import img2 from '../../Images/Image2.jpg';
import video from '../../Videos/video.mp4';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function ContactUs(){

 const [scrolled,setscrolled]=useState(false);
   useEffect(()=>{
    const handleScroll=()=>{
    const scroll=window.scrollY;
    setscrolled(scroll>0);}
    window.addEventListener('scroll',handleScroll);
   },[]);

  const navigate=useNavigate();

    return (
        <div>
        <div className='firstbackground'>
            <div id='navbar' className={scrolled?'scrolled':'noscroll'}>
                <div className='logo' onClick={()=>navigate('/')}>
                <h1>Library Management</h1>
                <img src={img} alt='book' width="50px" height="50px"/>
                </div>
                    <nav>
                        <h2 onClick={()=>navigate('/')}>Home</h2>
                        <h2>Support</h2>
                        <h2>Contact Us</h2>
                        <button name='login' onClick={()=>{navigate('/login');}}>Login</button>
                        <button name='started' onClick={()=>navigate('/signup')}>Get Started</button>
                    </nav>
                </div>
                <div className='centerpart'>
                    <h1>Library Cataloging</h1>
                    <h3>Future-Proof Your Library with Smart Management Solutions.</h3>
                     <button>Get Started</button>
                </div>
        </div>
        <div className='contact-form-container'>
                <h2>Contact Us</h2>
                <form className='contact-form'>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' id='name' name='name' placeholder='Your Name' required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' name='email' placeholder='Your Email' required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='subject'>Subject</label>
                        <input type='text' id='subject' name='subject' placeholder='Subject' required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='message'>Message</label>
                        <textarea id='message' name='message' placeholder='Your Message' rows='5' required></textarea>
                    </div>
                    <button type='submit' className='submit-button'>Send Message</button>
                </form>
            </div>
        </div>
        )
}

export default ContactUs;

