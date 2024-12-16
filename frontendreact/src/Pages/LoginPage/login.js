import '../LoginPage/login.css';
import img from '../../Images/book2.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import url from '../../Utils';


function Login(){
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');

    const [scrolled,setscrolled]=useState(false);
    const [response,setResponse]=useState(false);
    const submitData=async ()=>{
        const datafetched=await fetch(`${url}/user/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(
            {
                'email':email,
                'password':password,
            }
        )});
        if(datafetched.ok)
        {
            const data=await datafetched.json();
            console.log(data)
            setResponse(data.message);
            // alert(data.message);
            if(data.login)
             {
                Cookies.set('token',data.token);
                Cookies.set('userid',data.userid);
                Cookies.set('name',data.name);
                navigate('/home',{state:{data:data.name}});
            }
            else
               navigate('/login');
        }
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
                        <h2 onClick={()=>{navigate('/contact')}}>Contact Us</h2>
                        <button name='login' onClick={()=>{navigate('/login');}}>Login</button>
                        <button name='started' onClick={()=>navigate('/signup')}>Get Started</button>
                    </nav>
                </div>
                <div className='centerlogin'>
                   <div className='form'>
                        <div className='headtitle'>
                        <img src={img} width="70" height="70"/>
                        <h2>Manager Login</h2>
                        </div>
                        <input type='email' name='email' className='email' placeholder='Email' onChange={(e)=>setemail(e.target.value)}/>
                        <div className='password'><input type='password' name='password' placeholder='Password' onChange={(e)=>setpassword(e.target.value)}/>
                        <h3>Forgot?</h3>
                        </div>
                        <label>{response}</label>
                        <button className='sign' onClick={()=>submitData()}>Sign In</button>
                        <hr className='line'/>
                        <h3 className='formfooter'>Don't have an account?<span onClick={()=>navigate('/signup')}>  Sign Up!</span></h3>
                   </div>
                </div>
        </div>

        </div>
        )
}

export default Login;

