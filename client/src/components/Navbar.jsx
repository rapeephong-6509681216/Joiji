import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import Searchbar from './Searchbar'
import { Link } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import { UserContext } from '../components/UserContext'

function Navbar( { setSearchData } ) {
  const { userInfo, setUserInfo } = useContext(UserContext)
  userInfo.username = 'John Doe'

return (
  <div className='bg-stone-950 p-5 flex flex-col sm:flex-row justify-between'>
      <img src={logo} alt='logo' className='w-32 sm:w-36' />
      <div className='my-2 w-full sm:w-4/12 h-12'>
          <Searchbar setSearchData={setSearchData} />
      </div>
      <div className='flex flex-row space-x-10 mx-8 mt-5 sm:mt-0'>
          <Link to="/Queue" className='mt-5 text-white text-lg font-medium'>QUEUE</Link>
          <img src={avatar} alt='avatar' className='w-12 h-12 sm:w-auto sm:h-auto' />
          <div className='mt-5 text-white text-lg font-medium'>{userInfo.username}</div>
       </div>
  </div>
)
}

export default Navbar