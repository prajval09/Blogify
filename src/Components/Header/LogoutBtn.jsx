import React from 'react'
import authService from '../../Appwrite/Auth/Auth'
import { useDispatch } from 'react-redux'
import {logout} from '../../Store/AuthSlice'

function LogoutBtn() {
  const dispatch = useDispatch()
  const logouthandler = () =>{
    dispatch(logout())
  }
  return(
    <button className='inline-block px-6 py-2 bg-[#171717] duration-200 hover:bg-blue-100 rounded-full'onClick={logouthandler}>Logout</button>
  )
}

export default LogoutBtn