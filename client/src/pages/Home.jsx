import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='bg-background-home w-screen h-screen bg-cover bg-center'>
      <div className='p-5 flex justify-between'>
        <img src={logo} alt='logo' className='size-1/12' />
        <div className='flex space-x-10 mr-10 mt-2'>
          <Link to="/Sign in" className='bg-black-netflix px-10 text-white font-bold rounded flex items-center justify-center active:bg-black-netflix-active'>Sign In</Link>
          <Link to="/Sign up" className='bg-red-netflix px-10 text-white font-bold rounded flex items-center justify-center active:bg-red-netflix-active'>Sign Up</Link>
        </div>
      </div>
      <div className='flex flex-col ml-5 mt-80'>
        <h1 className='text-white text-6xl font-bold'>Movies Delivered</h1>
        <h3 className='text-white text-2xl'>Right to your mailbox. Free shipping, no late fees.</h3>
        <Link to="/Sign up" className='bg-red-netflix text-white font-medium text-lg rounded w-64 h-14 mt-4 flex items-center justify-center active:bg-red-netflix-active'>Sign Up</Link>
      </div>
    </div>
  )
}

export default Home