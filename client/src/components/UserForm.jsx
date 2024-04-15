import React from 'react'

function UserForm({ setUserInfo, setStep }) {

    const handleUsernameChange = (e) => {
        setUserInfo(prevState => ({ ...prevState, username: e.target.value }));
      }
    
      const handlePasswordChange = (e) => {
        setUserInfo(prevState => ({ ...prevState, password: e.target.value }));
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setStep(2);
      }

      
  return (
      <div className='bg-white shadow-lg shadow-slate-200 outline outline-1 outline-gray-300 rounded-sm p-8 w-96'>
        <h1 className='text-neutral-600 font-bold text-4xl'>Sign Up</h1>
        <form className='mt-12 space-y-6' onSubmit={handleSubmit}>
          <input type='text' onChange={handleUsernameChange} placeholder='Username' className='w-full h-16 outline outline-1 outline-stone-600 rounded-sm p-3 text-lg' required/>
          <input type='password' onChange={handlePasswordChange} placeholder='Add a Password' className='w-full h-16 outline outline-1 outline-stone-600 rounded-sm p-3 text-lg' required/>
          <button type="submit" className='bg-red-netflix text-white font-normal text-2xl rounded w-full h-16 flex items-center justify-center active:bg-red-netflix-active'>Next</button>
        </form>
        <div className='h-52' />
      </div>
  )
}

export default UserForm