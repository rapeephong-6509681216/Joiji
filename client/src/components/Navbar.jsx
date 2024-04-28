import React from 'react'
import logo from '../assets/logo.png'
import Searchbar from './Searchbar'
import { Link } from 'react-router-dom'
import avatar from '../assets/avatar.png'

function Navbar( { setSearchMovie } ) {
  const user = sessionStorage.getItem('user');

return (

  <div className='bg-stone-950 p-5 flex flex-col sm:flex-row justify-between'>
    <Link to="/">
      <img src={logo} alt='logo'className='w-32 md:w-36 lg:w-40 h-auto' />
    </Link>
    <div className='my-2 w-full sm:w-4/12 h-12'>
      <Searchbar setSearchMovie={setSearchMovie} />
    </div>
    <div className='space-x-6 flex justify-items-center'>
      <Link to="/Queue" className='mt-5 mb-5 text-white text-lg font-medium'>QUEUE</Link>
      <img src={avatar} alt='avatar'className='w-12 h-12 sm:w-auto sm:h-auto' />
      <div className='mt-5 mb-5 text-white text-lg text-nowrap font-medium'>{user}</div>
    </div>
  </div>
)
}

export default Navbar