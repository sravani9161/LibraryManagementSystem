import { useState,useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";



// function Logout()
// {
//     const location=useLocation();
//     const navigate=useNavigate();
//     const [cookie,setcookie]=useState('');

//     // useEffect(()=>{
//     //   const cookievalue=document.cookie.split(';')[0].split('=')[1]
//     //   setcookie(cookievalue);
//     //   if(!cookievalue){
//     //   const delayedNavigation = () => {
//     //     log();
//     //   };

//     //   // Delay the navigation using setTimeout
//     //   setTimeout(delayedNavigation, 1000);}
//     // },[]);

//         function log()
//     {
//             document.cookie=`ID=,expires=Thu, 01 Jan 1970 00:00:00 UTC,`;
//             navigate('/login');
//     }
// }

// export function log() {
//     log();
//   }
// export default Logout;