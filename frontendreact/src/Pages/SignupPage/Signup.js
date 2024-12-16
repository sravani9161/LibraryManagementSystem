import signup  from '../SignupPage/Signup.module.css';
import img from '../../Images/book2.png';
import img2 from '../../Images/Image2.jpg';
import video from '../../Videos/video.mp4';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import url from '../../Utils';

function Signup(){

 const signUpUrl=`http://localhost:2000/user/register`;  //data to be posted as sign up form

 const [name,setname]=useState('');
 const [email,setemail]=useState('');
 const [password,setpassword]=useState('');
 const [cpassword,setcpassword]=useState('');
 const [error,seterror]=useState('');
 const [response,setresponse]=useState('');
 const [scrolled,setscrolled]=useState(false);

  const submitData=async ()=>{
    const regex='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
    if(email=='' || name==null || !email.match(regex))
    {
        seterror('place the email');
        return;
    }
    if(name=='' || name==null)
    {
        seterror('place the name');
        return;
    }
    if(password=='' || password==null)
    {
        seterror('place the password');
        return;
    }
    if(cpassword=='' || cpassword==null)
    {
        seterror('place the password');
        return;
    }
    if(cpassword!==password)
    {
        seterror('password not match!');
        return;
    }

     const dataposted=fetch(`${url}/user/register`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({
        "name":name,
        "email":email,
        "password":password,
        "confirmpassword":cpassword
     })}).then(e=>e.json()).then(e=>{setresponse(e.message)}).catch(e=>alert(e));

  }
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
                <div className='logo'  onClick={()=>navigate('/')}>
                <h1>Library Management</h1>
                <img src={img} alt='book' width="50px" height="50px"/>
                </div>
                    <nav>
                    <h2 onClick={()=>navigate('/')}>Home</h2>
                        <h2>Support</h2>
                        <h2  onClick={()=>{navigate('/contact')}}>Contact Us</h2>
                        <button name='login' onClick={()=>{navigate('/login');}}>Login</button>
                        <button name='started' onClick={()=>navigate('/signup')}>Get Started</button>
                    </nav>
                </div>
                <div className={signup.centerlogin}>
                <h1>Sign Up for Library Management</h1>
                <h2>Your library catalog available anywhere, anytime.</h2>
                   <div className={signup.form}>
                        <div className='headtitle'>
                        <h2>Account Info</h2>
                        </div>
                        <div className={signup.row}>
                        <div className={signup.column}>
                        <label>Email:</label>
                        <input type='email' name='email' className='email' placeholder='Email' onChange={(e)=>setemail(e.target.value)}/>
                        </div>
                            <div className={signup.column}>
                            <label>Name:</label>
                            <input type='text' name='name' className='name' placeholder='Name' onChange={(e)=>setname(e.target.value)}/>
                            </div>
                        </div>
                        <div className={signup.row}>
                            <div className={signup.column}>
                            <label>Password:</label>
                            <input type='password' name='password'  placeholder='Password' onChange={(e)=>setpassword(e.target.value)}/>
                            </div>
                            <div className={signup.column}>
                            <label>Confirm Password:</label>
                            <input type='text' name='confirmpassword' placeholder='Confirm Password' onChange={(e)=>setcpassword(e.target.value)}/>
                            </div>
                        </div>
                        <h4 className>{response}</h4>
                        <button className='sign' onClick={()=>submitData()}>Sign Up</button>
                        <hr className='line'/>
                        <h3 className='formfooter'>Already Have Account!<span  onClick={()=>navigate('/login')}>  Sign In!</span></h3>
                   </div>
                </div>
        </div>

        </div>
        )
}
export default Signup;

