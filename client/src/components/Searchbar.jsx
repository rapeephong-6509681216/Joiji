import React from 'react'
import search from '../assets/search.svg'

function Searchbar() {
  return (
    <div className='flex'>
        <input type='text' placeholder='Search movie' className='text-white text-lg outline-none p-3 bg-transparent border-2 border-r-0 border-stone-300 rounded-sm w-full h-full' />
        <button type='submit' className='text-white bg-stone-300 border-4 border-l-0 border-stone-300 w-14'>
          <img src={search} alt='search' className='ml-1 size-10/12 -w-full h-full'/>
        </button>
    </div>
  )
}

export default Searchbar