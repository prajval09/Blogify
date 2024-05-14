import service from '../Appwrite/Config/Config'
import { Link } from 'react-router-dom'

import React, { useEffect, useState } from 'react'

function Postcard({$id,Title, Image}) {
const [imageUrl, setImageUrl] = useState('');

// service.Getfilepreview(Image).then{

// }

useEffect(() => {
  const fetchImageUrl = async () => {
    try {
      const url = await service.Getfilepreview(Image);
      setImageUrl(url.href);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  fetchImageUrl();
}, [service, Image]);

  return(
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-[#171717] hover:bg-slate-800 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
              {}
               <img src={imageUrl} alt={Title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold text-[#b5d5ff]'
            >{Title}</h2>
        </div>
    </Link>
  )
}

export default Postcard