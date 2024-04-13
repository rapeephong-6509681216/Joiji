import React from 'react'

function Menubar({ setGenre }) {
  return (
    <div className='bg-neutral-100 p-5 text-white'>
        <div className='flex flex-wrap justify-around text-black font-light text-xl'>
            <button onClick={() => setGenre('All')} className='m-2'>All</button>
            <button onClick={() => setGenre('Top10')} className='m-2'>Top 10</button>
            <button onClick={() => setGenre('Action')} className='m-2'>Action</button>
            <button onClick={() => setGenre('Adventure')} className='m-2'>Adventure</button>
            <button onClick={() => setGenre('Romance')} className='m-2'>Romance</button>
            <button onClick={() => setGenre('Animation')} className='m-2'>Animation</button>
            <button onClick={() => setGenre('Horror')} className='m-2'>Horror</button>
            <button onClick={() => setGenre('Comedy')} className='m-2'>Comedy</button>
            <button onClick={() => setGenre('Drama')} className='m-2'>Drama</button>
        </div>
    </div>
  )
}

export default Menubar