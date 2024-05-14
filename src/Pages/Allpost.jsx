import React, { useEffect, useState } from 'react'
import Postcard from '../Components/Postcard'
import service from '../Appwrite/Config/Config'
import Container from '../Components/Container/Container'


// function Allpost() {
//     console.log("i am called");
//     const [Posts, setPosts] = useState([])
//     // useEffect(()=>{

//     // },[])

//     // service.Getdocument() this can be here

//     service.Listdocument([]).then((posts) => {
//         if(posts){
//             // setPosts(Posts)
//             // console.log(Posts);
//             setPosts(posts.documents) 
//         }

//     })

//   return(
//     <div className='w-full py-8'>
//         {/* <Container>
//                 <div className='flex flex-wrap'>
//                 {Posts.map((post) => (
//                     <div key={post.$id} className='p-2 w-1'>
//                         <Postcard {...post}/>
//                     </div>
//                     ))}
//                 </div>
//         </Container> */}

//         <div className='w-full py-8'>
//         <Container>
//             <div className='flex flex-wrap'>
//                 {Posts.map((post) => (
//                     <div key={post.$id} className='p-2 w-1/4'>
//                         {console.log(Posts.length)}
//                         <Postcard {...post} />
//                     </div>
//                 ))}
//             </div>
//             </Container>
//         </div>
//     </div>
//   )
// }

// export default Allpost

function AllPosts() {
    console.log("entered in allpost ");
    const [posts, setPosts] = useState([])
    useEffect(() => {
    service.Listdocument([]).then((posts) => {
        if (posts) {

            console.log("i am post");
            setPosts(posts.documents)
        }
    })

}, [])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        {console.log(post)}
                        <Postcard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts