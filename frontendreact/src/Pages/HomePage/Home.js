import home from './Home.module.css';
import './Home.css';
import img from '../../Images/book2.png';
import search from '../../Images/search.png';
import btn from '../../Images/switch.jpg'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState} from 'react';
import Header from '../../Component/Header';

// import Logout, {log} from '../../Utilties/logout.js';

function Home()
{
  const [searchTerm,setSearchTerm]=useState('');

  const api_key='AIzaSyAA5BNl9WcPT7OZiyktXKTZI1lWPwjcbsY';

  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${api_key}`;

  const [book,setbooks]=useState([]);
 


  const [cookie,setcookie]=useState('');
  const logout=()=>{
     document.cookie=`ID=,expires=Thu, 01 Jan 1970 00:00:00 UTC,`;
     setcookie('');
     navigate('/login');
  }
  useEffect(()=>{
    const cookie=document.cookie.split(';')[0].split('=')[1]
    setcookie(cookie);
    if(!cookie)
       logout();
},[]);

const books=()=>{

  fetch(apiUrl,{method:'GET'}).then(e=>e.json()).then(e=>{
    if(e.error) {setSearchTerm('')} else {setbooks(e.items)};console.log(e)
  }).catch(e=>console.log(e));
}
const selectGenre=(genre)=>{
  genre=genre.toLowerCase();
  if(book!=null)
  {
    // console.log(book);
   const bookCategory=book.filter(b=>b.volumeInfo.categories?.toString().toLowerCase()?.includes(genre)||
     b.volumeInfo?.description?.toString().toLowerCase().includes(genre) || 
     b.volumeInfo?.title?.toString().toLowerCase().includes(genre))
   ;
    setbooks(bookCategory);
  }
}

useEffect(()=>books(),[searchTerm])
  const location=useLocation();
  const navigate=useNavigate();
  return(
    <div className='Container'>
      <Header/>
        <div className='subpage2'>
          <div className='searchbar'>
            <div className='search'>
              <img src={search} width='25px' height='25px'/>
              <input type='text' placeholder='Start Searching' onChange={(e)=>setSearchTerm(e.target.value)}></input>
            </div>
            <div className='logout'>
               <h3>Hi! {location.state.data}</h3>
               <img src={btn} width='50' height='50'/>
            </div>
          </div>
          {searchTerm!=null &&  searchTerm!='' && book.length>0?
                <div className='results' style={{marginTop:"50px"}}>
                <hr/>
              <h1>Results</h1>
              <div className='bookshelf' style={{marginLeft:"20px"}}>
                {book.map((b,index)=>(
                  <div className='newbook' key={index}>
                   <div className='imageblock'>
                     <img src={b.volumeInfo.imageLinks?.smallThumbnail} width='100' height='100'/>
                   </div>
                    <div className='bookcontent'>
                      <h2>{b.volumeInfo.title}</h2>
                      <h3>{b.volumeInfo.subtitle}</h3>
                      <h3>Country:<span>{b.accessInfo.country}</span></h3>
                      
                      <h4>{b.volumeInfo?.description}
                      </h4>
                      <h3>Category:<span>{b.volumeInfo.categories}</span></h3>
                      <h3>AUthor:<span>{b.volumeInfo.authors}</span></h3>
                    </div>
                  </div>
                ))}
              </div>
           </div>:''
          }
        </div>
    </div>
  );
}

export default Home;