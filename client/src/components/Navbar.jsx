import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import Searchbar from './Searchbar'
import { Link } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import { UserContext } from '../components/UserContext'

function Navbar() {
    const { userInfo, setUserInfo } = useContext(UserContext)
    userInfo.username = 'John Doe'

  return (
    <div className='bg-stone-950 p-5 flex justify-between'>
        <img src={logo} alt='logo' className='size-1/12' />
        <div className='my-2 mr-56 w-4/12 h-12'>
            <Searchbar />
        </div>
        <div className='flex flex-row space-x-10 mx-8'>
            <Link to="/Queue" className='text-white my-5 text-lg font-medium'>QUEUE</Link>
            <img src={avatar} alt='avatar' />
            <div className='text-white my-5 text-lg font-medium'>{userInfo.username}</div>
         </div>
    </div>
  )
}

export default Navbar