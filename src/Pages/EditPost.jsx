import React, { useEffect, useState } from 'react'
import Container from '../Components/Container/Container'
import Postform from '../Components/Postform/Postform'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import service from '../Appwrite/Config/Config'
import Post  from './Post'

function EditPost() {
    const [Posti, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            service.Getdocument(slug).then((post)=>{
                if(post){
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/')
        }
    },[slug, navigate])



  return(
    Posti?(<div className='py-8'>
        <Container>
            <Postform post={Posti}/>
        </Container>
    </div>):null
  )
}

export default EditPost