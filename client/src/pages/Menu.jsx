import React from 'react'
import Navbar from '../components/Navbar'
import Menubar from '../components/Menubar'
import { useState, useEffect } from 'react'

//test
function Menu() {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/movies`)
      .then(response => response.json())
      .then(movieData => {
        setMovies(movieData)
      })
      .catch(error => console.error('Error:', error));
  }, []);

  console.log(movies)
  return (
    <div>
      <Navbar />
      <Menubar />
      <div className='font-normal ml-24 my-16 text-4xl'>Top 10</div>
      <div className='mx-4 w-auto grid grid-cols-7 gap-2'>
        {movies.map((movie, index) => (
            <img key={index} src={import.meta.env.VITE_PATH_POSTER + movie.poster_path} alt={movie.title} className='w-64 h-96' />
        ))}
      </div>
    </div>
  )
}

export default Menu