import React from 'react'
import Container from '../Container/Container'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../Logo'
import LogoutBtn from './LogoutBtn'
import { useSelector } from 'react-redux'

// function Header() {

//   const AuthStatus = useSelector((state) => state.auth.status)

//   const navigate = useNavigate()

//   const NavItems = [
//     {
//       name: 'Home',
//       slug: "/",
//       active: true
//     }, 
//     {
//       // console.log("tett")
//       name: "Login",
//       slug: "/login",
//       active: !AuthStatus,
//   },
//   {
//       name: "Signup",
//       slug: "/signup",
//       active: !AuthStatus,
//   },
//   {
//       name: "All Posts",
//       slug: "/all-posts",
//       active: AuthStatus,
//   },
//   {
//       name: "Add Post",
//       slug: "/add-post",
//       active: AuthStatus,
//   },
//   ] 

//   return(
//     <header className='py-3 shadow bg-gray-500'>
//       <Container>
//       <nav className='flex'>
//         <div className='mr-4'>
//           <Link to = '/'>
//             <Logo width='70px'/>
//           </Link>
//         </div>

//         <ul className='flex ml-auto'>
//           {NavItems.map((item) => 
//             item.active ? (
//             <li key={item.name}>
//               <button onClick={()=>navigate(item.slug)} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{item.name}</button>
//             </li>) : (null)
//           )}
//           {AuthStatus && (
//             <li>
//               <LogoutBtn/>
//             </li>
//           )}
//         </ul>
//       </nav>
//       </Container>
//     </header>
//   )
// }

// export default Header

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]


  return (
    <header className='py-3 shadow bg-[#1e1919] w-[100%]'>
      <Container>
        <nav className='flex items-center'>
          <div className=''>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex ml-auto items-center gap-4'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => {navigate(item.slug) , console.log("I am clicked")}}
                className='inline-bock px-6 py-2 duration-200 bg-[#171717] hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header