import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Menubar from '../components/Menubar'
import { motion } from 'framer-motion'
import Moviedetail from '../components/Moviedetail'

function Menu() {

  const [genre, setGenre] = useState('All')
  const [poster, setPoster] = useState([])
  const [searchMovie, setSearchMovie] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current || searchMovie === '') {
      isFirstRender.current = false;
      return;
    }

    setGenre('Search');
    fetch(`${import.meta.env.VITE_API_URL}/movies/poster/search/${searchMovie}`)
      .then(response => response.json())
      .then(movieData => {
        setPoster(movieData)
      })
      .catch(error => console.error('Error:', error));
  }, [searchMovie]);

  useEffect(() => {
    if (genre === 'Search') {
      return;
    }

    setSearchMovie('');
    fetch(`${import.meta.env.VITE_API_URL}/movies/${genre}/poster`)
      .then(response => response.json())
      .then(movieData => {
        setPoster(movieData)
      })
      .catch(error => console.error('Error:', error));
  }, [genre]); 

  return (
    <div>
      <Navbar setSearchMovie={setSearchMovie}/>
      <Menubar setGenre={setGenre} />
      <div className='font-normal ml-24 my-16 text-4xl'>{genre}</div>
      <div className='mx-4 w-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-2'>
        {poster.map((poster) => (
          <motion.img 
            key={genre + poster.filmID} 
            src={import.meta.env.VITE_PATH_POSTER + poster.poster_path} 
            alt={poster.filmID} 
            className='w-64 h-96 cursor-pointer'
            initial={{ opacity: 0, scale: 0.9}}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            onClick={() => {setSelectedMovie(poster.filmID)}}
          />
        ))}
      </div>
      {selectedMovie && <Moviedetail filmID={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </div>
  )

  // const [movies, setMovies] = useState([])
  // const [genres, setGenres] = useState('All')
  // const [selectedMovie, setSelectedMovie] = useState(null)
  // const [searchData, setSearchData] = useState('')

  // const filterMoviesByGenre = (movies, genre) => {
  //   if (genre === 'All' || genre === 'Top 10') {
  //     return movies
  //   } else {
  //     return movies.filter(movie => movie.genre.includes(genre))
  //   }
  // }

  // useEffect(() => {
  //   if (genres === 'Top 10') {
  //   fetch(`${import.meta.env.VITE_API_URL}/movies/top10`)
  //     .then(response => response.json())
  //     .then(movieData => {
  //       setMovies(filterMoviesByGenre(movieData, genres))
  //     })
  //     .catch(error => console.error('Error:', error));
  //   } else {
  //     fetch(`${import.meta.env.VITE_API_URL}/movies`)
  //       .then(response => response.json())
  //       .then(movieData => {
  //         setMovies(filterMoviesByGenre(movieData, genres))
  //       })
  //       .catch(error => console.error('Error:', error));
  //   }
  // }, [genres]);

  // useEffect(() => {
  //   if (searchData != '') {
  //     fetch(`${import.meta.env.VITE_API_URL}/movies/search/${searchData}`)
  //     .then(response => response.json())
  //     .then(movieData => {
  //       setMovies(movieData)
  //     })
  //     .catch(error => console.error('Error:', error));
  //   }
  // }, [searchData]);

  // return (
  //   <Fragment>
  //   <div>
  //     <Navbar setSearchData={setSearchData} />
  //     <Menubar setGenres={setGenres} />
  //     <div className='font-normal ml-24 my-16 text-4xl'>{genres}</div>
  //     <div className='mx-4 w-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-2'>
  //       {movies.map((movie, index) => (
  //         <motion.img 
  //           key={genres + index} 
  //           src={import.meta.env.VITE_PATH_POSTER + movie.poster_path} 
  //           alt={movie.title} 
  //           className='w-64 h-96 cursor-pointer'
  //           initial={{ opacity: 0, scale: 0.9}}
  //           animate={{ opacity: 1, scale: 1 }}
  //           whileHover={{ scale: 1.1 }}
  //           transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
  //           onClick={() => {setSelectedMovie(movie)}}
  //         />
  //       ))}
  //     </div>
  //   </div>
  //   {selectedMovie && <Moviedetail movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
  //   </Fragment>
  // )
}

export default Menu