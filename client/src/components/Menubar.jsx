import React from 'react'

function Menubar() {
  return (
    <div className='bg-neutral-100 p-5 text-white'>
        <div className='flex justify-around text-black font-light text-xl'>
            <button>Top 10</button>
            <button>Action</button>
            <button>Adventure</button>
            <button>Romance</button>
            <button>Animation</button>
            <button>Horror</button>
            <button>Comedy</button>
            <button>Drama</button>
        </div>
    </div>
  )
}

export default Menubar