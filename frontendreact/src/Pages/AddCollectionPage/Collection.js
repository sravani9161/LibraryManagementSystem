import collection from './Collection.module.css';
import './Collection.css';

import search from '../../Images/search.png';
import btn from '../../Images/switch.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../../Component/Header';
import url from '../../Utils';



function Collection()
{
  const [collectionName,setCollectionName]=useState({'userid':Cookies.get('userid'),collectionname:'',language:'Arabic'});
  const updateCollection=()=>{
    fetch(`${url}/collection`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(collectionName)})
    .then(e=>e.json())
    .then(e=>alert(e.message));
  }

   

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
                <h2>Collection Title</h2>
                <input type='text' placeholder='Collection Title' onChange={(e)=>setCollectionName({...collectionName,collectionname:e.target.value})}/>
                <h4>Limit 40 characters. e.g. (My Books, Movie Wishlist, Console Games, Family CD Collection).</h4>
            </div>
            <div className='bar2'>
                <h2>Language</h2>
                <select onChange={(e)=>setCollectionName({...collectionName,language:e.target.value})}>
                    <option>Arabic</option>
                    <option>Bengali</option>
                    <option>Dutch</option>
                    <option>English</option>
                    <option>Hindi</option>
                </select>
                <h4>The display language of the items in this collection. Determines how best to sort alphabetically.</h4>
            </div>
            <button onClick={()=>updateCollection()}>Add Collection</button>
        </div>
        </div>
    </div>
  );
}

export default Collection;
