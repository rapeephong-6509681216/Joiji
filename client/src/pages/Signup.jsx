import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../components/UserContext'

function Signup() {

  const { userInfo, setUserInfo } = useContext(UserContext)

  const handleUsernameChange = (e) => {
    setUserInfo(prevState => ({ ...prevState, username: e.target.value }));
  }

  const handlePasswordChange = (e) => {
    setUserInfo(prevState => ({ ...prevState, password: e.target.value }));
  }
  
  return (
    <div className='flex h-screen bg-gray-100'>
      <div className='box-content bg-white h-3/5 w-1/5 p-8 m-auto shadow-lg shadow-slate-200 outline outline-1 outline-gray-300 rounded-sm'>
        <div className='p-4'>
          <h1 className='text-neutral-600 font-bold text-4xl'>Sign Up</h1>
          <div className='mt-12 space-y-6'>
            <input type='text' onChange={handleUsernameChange} placeholder='Username' className='w-full h-16 outline outline-1 outline-stone-600 rounded-sm p-3 text-lg' required/>
            <input type='password' onChange={handlePasswordChange} placeholder='Add a Password' className='w-full h-16 outline outline-1 outline-stone-600 rounded-sm p-3 text-lg' required/>
            <Link to={userInfo.username && userInfo.password ? "/Plan" : "#"} className='bg-red-netflix text-white font-medium text-lg rounded w-full h-16 flex items-center justify-center active:bg-red-netflix-active'>Next</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup