import { useEffect, useState } from 'react'
import './App.css'
import Conf from './Conf/Conf'
import { useDispatch } from 'react-redux'
import authService from './Appwrite/Auth/Auth'
import {login,logout} from './Store/AuthSlice'
import { Header, Footer } from './Components'
import { Outlet } from 'react-router-dom'



function App() {
  
  const [loading, setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() =>{
      authService.Getcurrentuser()
      .then((data)=>{
        if (data) {
          dispatch(login({data}))
        }
        else{
          dispatch(logout())
        }
      })
      .finally(()=>setloading(false))
  })

  return !loading ? (
      <div className='min-h-screen flex flex-wrap content-between bg-black'>
        <div className='w-full block'>
          <Header />
          <main>
          <Outlet />
          </main>
          <Footer />
      </div>
    </div>
  ):(
    <div>Loading.....</div>
  )
}

export default App
