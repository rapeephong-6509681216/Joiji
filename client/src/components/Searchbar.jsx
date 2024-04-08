import React from 'react'
import searchIcon from '../assets/search.svg'

function Searchbar({ setSearchData }) {

  return (
    <div className='flex w-full sm:w-auto'>
      <input type='text' id='input_search' placeholder='Search movie' className='text-white text-lg outline-none p-3 bg-transparent border-2 border-r-0 border-stone-300 rounded-sm w-full h-full' />
      <button type='submit' className='text-white bg-stone-300 border-4 border-l-0 border-stone-300 w-14' onClick={ () => setSearchData(document.getElementById('input_search').value)}>
        <img src={searchIcon} alt='search' className='ml-1 w-full h-full'/>
      </button>
    </div>
  );
}

export default Searchbar