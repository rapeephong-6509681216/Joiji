import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignIn() {

    const [userInfo, setUserInfo] = useState({ username: '', password: '' });
    const [error,setError] = useState();
    const [SignIn, setSignIn] = useState('Sign in');
    const navigate = useNavigate();
  
    const handleUsernameChange = (e) => {
      setUserInfo(prevState => ({ ...prevState, username: e.target.value }));
    }
  
    const handlePasswordChange = (e) => {
      setUserInfo(prevState => ({ ...prevState, password: e.target.value }));
    }
  
    const handleSubmit = (e) => {
      setSignIn('Signing in...')
      e.preventDefault();
      e.stopPropagation();

      fetch(`${import.meta.env.VITE_API_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
      .then(response => {
          if (response.ok) {
            sessionStorage.setItem("user", `${userInfo.username}`);
            navigate('/Menu');
            return true;
          } else {
              setError('Incorrect username or password.');
              setUserInfo(prevState => ({ ...prevState, password: '' }));
              setSignIn('Sign in');
              return;
          }
          
      })
    }
    
    return (
      <div className='bg-gray-100 flex items-center justify-center h-screen'>
        <div className='bg-white shadow-lg shadow-slate-200 outline outline-1 outline-gray-300 rounded-sm p-8 w-96'>
          <h1 className='text-neutral-600 font-bold text-4xl'>Sign In</h1>
          <form className='mt-12 space-y-6' onSubmit={handleSubmit}>
            {error? <div className='bg-red-200 rounded-sm p-3 text-black font-medium outline outline-1 outline-red-600'>{error}</div>:null}
            <input type='text' value={userInfo.username} onChange={handleUsernameChange} placeholder='Username' className='w-full h-16 outline outline-1 outline-stone-600 rounded-sm p-3 text-lg' required/>
            <input type='password' value={userInfo.password} onChange={handlePasswordChange} placeholder='Add a Password' className='w-full h-16 outline outline-1 outline-stone-600 rounded-sm p-3 text-lg' required/>
            <button type="submit" className='bg-red-netflix text-white font-normal text-2xl rounded w-full h-16 flex items-center justify-center active:bg-red-netflix-active'>{SignIn}</button>
          </form>
          <div className='h-52' />
        </div>
      </div>
    )
  }

export default SignIn