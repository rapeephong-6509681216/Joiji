import React from 'react'

function Menubar({ setGenres }) {
  return (
    <div className='bg-neutral-100 p-5 text-white'>
        <div className='flex flex-wrap justify-around text-black font-light text-xl'>
            <button onClick={() => setGenres('All')} className='m-2'>All</button>
            <button onClick={() => setGenres('Top 10')} className='m-2'>Top 10</button>
            <button onClick={() => setGenres('Action')} className='m-2'>Action</button>
            <button onClick={() => setGenres('Adventure')} className='m-2'>Adventure</button>
            <button onClick={() => setGenres('Romance')} className='m-2'>Romance</button>
            <button onClick={() => setGenres('Animation')} className='m-2'>Animation</button>
            <button onClick={() => setGenres('Horror')} className='m-2'>Horror</button>
            <button onClick={() => setGenres('Comedy')} className='m-2'>Comedy</button>
            <button onClick={() => setGenres('Drama')} className='m-2'>Drama</button>
        </div>
    </div>
  )
}

export default Menubar