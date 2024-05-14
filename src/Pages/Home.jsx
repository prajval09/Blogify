import React, { useEffect, useState } from 'react'
import service from '../Appwrite/Config/Config'
import Container from '../Components/Container/Container'
import Postcard from '../Components/Postcard'


function Home() {
    const [Posts, setPosts] = useState([])
    useEffect(()=>{
        service.Listdocument().then((Posts) => {
            if(Posts){
                
                setPosts(Posts.documents)
            }
    })
    
    },[])

    if(Posts.length === 0){
        {console.log("Posts")}
        return (
            <div>Login to read post</div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {Posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home