import ItemPage from './ItemPage.module.css';
import './ItemPage.css';
import img from '../../Images/book2.png';
import search from '../../Images/search.png';
import btn from '../../Images/switch.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../../Component/Header';
import url from '../../Utils';



const api_key='AIzaSyAA5BNl9WcPT7OZiyktXKTZI1lWPwjcbsY';

function Item()
{
  const [currentCollection,setCurrentCollection]=useState();

  const [searchTerm,setSearchTerm]=useState('');
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${api_key}`;

  const [book,setbooks]=useState([]);
  const [genre,setgenre]=useState('General');
  
  
  const [cartItem,setItemCart]=useState([]);
 
  const   setItemsCart=async (newbook)=>{
      setItemCart(newbook) ;
      addItemToCollection(newbook);
  }

  const addItemToCollection = async (book) => {
    if (!book || !currentCollection) {
      // console.log(book);
        console.error("Missing book or collection");
        return;
    }

    console.log("Adding book to collection:", book, currentCollection);

    try {
        const response = await fetch(`${url}/collection/additem`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                collectionid: currentCollection,
                title: book.volumeInfo.title,
                description: book.volumeInfo.description,
                country: book.saleInfo.country,
                author: book.volumeInfo.authors[0],
                category: book.volumeInfo.categories[0],
                imageurl: book.volumeInfo.imageLinks?.smallThumbnail,
            }),
        });

        const result = await response.json();
       if(result)
       {
        alert(result.message);
       }
    } catch (error) {
        console.error("Error adding item to collection:", error);
    }
};

  const books=()=>{
    fetch(apiUrl,{method:'GET'}).then(e=>e.json()).then(e=>{
      if(e.error) {setSearchTerm('')} else {setbooks(e.items)};
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
  const navigate=useNavigate();
  
  const [collectionname,setcollection]=useState({});

  useEffect(()=>{
    findCollections();
  },[]);

  const findCollections=async ()=>{
     await fetch(`${url}/collection/find`,{method:'POST',body:JSON.stringify({"userid":Cookies.get('userid')}),headers:{'Content-Type':'application/json'}}).then(e=>e.json())
     .then(e=>{
  
      if(e.data)
      {
        console.log("data",e.data);
        setcollection(e.data);
      }
     });
  }

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
   

  return(
    <div className='Container'>
       <Header/>
        <div className='subpage2'>
          <div className='searchbar'>
            <div className='search'>
              <h1>Add Your Collection</h1>
            </div>
            <div className='logout'>
               <h3>{Cookies.get('name')}</h3>
               <img src={btn} width='50' height='50'/>
            </div>
          </div>
          <hr/>
        <div className='collectionform'>
            <div className='bar1'>
                <h2>Selection Collection</h2>
                <select onChange={(e)=>setCurrentCollection(e.target.value)} defaultValue="">
                <option value="" disabled>Select a collection</option>
                {collectionname.length > 0 ? (
                    collectionname.map((e, index) => (
                        <option key={index} value={e._id}>
                            {e.collectionname}
                        </option>
                    )
                  )
                ) : (
                    <option disabled>No collections available</option>
                )}
                </select>
                <h4>Choose the collection you're adding items to.</h4>
            </div>
            <div className='bar2'>
                <h2>Selection Item Type</h2>
                <select onChange={(e)=>setgenre(e.target.value)}>
                   <option>General</option>
                   <option>Fiction</option>
                   <option>Romance</option>
                   <option>Fantasy</option>
                   <option>Science</option>
                   <option>Drama</option>
                   <option>Poetry</option>
                   <option>Mystery</option>
                </select>
                <h4>The type of item are you adding.</h4>
            </div>
            <div className='bar3'>
                <h2>Search for Books </h2>
                <input type='text' placeholder='Search' onChange={(e)=>setSearchTerm(e.target.value)}/>
                <h4>Search by ISBN or keyword. ISBN search will auto-add an item.</h4>
                <button onClick={()=>{books();selectGenre(genre)}}>Search</button>
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
                     <button onClick={()=>setItemsCart(b)}>Add Item</button>
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
    </div>
  );
}

export default Item;
