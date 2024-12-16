import './Collection.css';
import img from '../../Images/book2.png';
import search from '../../Images/search.png';
import btn from '../../Images/switch.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../../Component/Header';
import url from '../../Utils';


function YourCollection()
{
  const [collectionName,setCollectionName]=useState({'userid':Cookies.get('userid'),collectionname:'',language:'Arabic'});

  const [collectionItem,setCollectionItems]=useState([]);

  const updateCollection=()=>{
    fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(collectionName)})
    .then(e=>e.json())
    .then(e=>alert(e.message));
  }
  const navigate=useNavigate();
  
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
   
  const [currentCollection,setCurrentCollection]=useState();

 const [collectionname,setcollection]=useState({});

  useEffect(()=>{
    findCollections();
  },[]);

  
  const findCollections=async ()=>{
     await fetch(`${url}/collection/find`,{method:'POST',body:JSON.stringify({"userid":Cookies.get('userid')}),headers:{'Content-Type':'application/json'}}).then(e=>e.json())
     .then(e=>{
  
      if(e.data)
      {
        // console.log("data",e.data);
        setcollection(e.data);
      }
     });
  }


  
  const findItemsInCollections=async ()=>{
    console.log(currentCollection)
    await fetch(`${url}/collection/finditems`,{method:'POST',body:JSON.stringify({"collectionid":currentCollection}),headers:{'Content-Type':'application/json'}}).then(e=>e.json())
    .then(e=>{
 
     if(e.data)
     {
      //  console.log("items",e.data);
       setCollectionItems(e.data);
     }
    });
 }

 const deleteItem=async (id)=>{
    console.log(id);
    await fetch(`${url}/collection/deleteitem`,{method:'DELETE',body:JSON.stringify({"itemid":id}),headers:{'Content-Type':'application/json'}}).then(e=>e.json())
    .then(response=>{
 
     if(response)
     {
       alert(response.message)
     }
    });
 }

  return(
    <div className='Container'>
           <Header/>   
        <div className='subpage2'>
          <div className='searchbar'>
            <div className='search'>
              <h1>View Your Collection</h1>
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
            </div>
            <button onClick={()=>findItemsInCollections()}>View Collection</button>
        </div>
        <div className='itemdisplayed'>

        {collectionItem?.map((b,index)=>(
                  <div className='newbook' key={index}>
                   <div className='imageblock'>
                     <img src={b.imageurl} width='100' height='100'/>
                   </div>
                    <div className='bookcontent'>
                      <h2>{b.title}</h2>
                      <h3>Country:<span>{b.country}</span></h3>
                    
                      <h3>Category:<span>{b.category}</span></h3>
                      <h3>AUthor:<span>{b.author}</span></h3>
                    </div>
                    <button onClick={()=>deleteItem(b._id)}>Delete</button>
                  </div>
                ))}
        </div>
      
        </div>
    </div>
  );
}

export default YourCollection;
