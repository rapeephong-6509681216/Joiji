import React, { useEffect, useState } from 'react'

function Moviedetail( { movie, onClose }) {
  
    const [director, setDirector] = useState([])
    const [star, setStar] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/movies/${movie.filmID}/director`)
            .then(response => response.json())
            .then(data => {
                setDirector(data)
            })
            .catch(error => console.error('Error:', error));

        fetch(`${import.meta.env.VITE_API_URL}/movies/${movie.filmID}/star`)
            .then(response => response.json())
            .then(data => {
                setStar(data)
            })
            .catch(error => console.error('Error:', error));
    }, [movie]);

  return (
    <div className='z-50 fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center' onClick={onClose}>
        <div className='box-content'>
            <div className='bg-white w-[900px] h-[600px]' onClick={e => e.stopPropagation()}>
                <div className='bg-stone-100 bg-opacity-20 w-full h-16 outline outline-1 outline-stone-300'>
                    <div className='flex justify-end'>
                        <button className='text-black text-6xl font-light mr-5' onClick={onClose} >&times;</button>
                    </div> 
                </div>
                <div className='flex flex between p-12 pt-6'>
                    <div>
                        <h3 className='font-medium text-3xl'>{movie.title}</h3>
                        <div className='mt-4 mr-[100px]'>
                            <p className='text-warp font-normal text-lg'>{movie.outline}</p>
                            <p className='font-medium mt-8 text-lg'>
                                Director:
                                <span className='font-normal'>
                                {director.map((d, index) => (
                                    <span key={index}> {d.director}{index < star.length - 1 ? ', ' : ''}</span>
                                ))}
                                </span>
                            </p>
                            <p className='font-medium text-lg'>
                                Star:
                                <span className='font-normal'>
                                    {star.map((s, index) => (
                                    <span key={index}> {s.star}{index < star.length - 1 ? ', ' : ''}</span>
                                    ))}
                                </span>
                            </p>
                            <p className='font-medium text-lg'>
                                Genre:
                                <span className='font-normal'>
                                    <span > {movie.genre}</span>
                                </span>
                            </p>
                            <p className='font-medium text-lg'>
                                Stock:
                                <span className='font-normal'>
                                    <span > {movie.stock}</span>
                                </span>
                            </p>
                        </div>
                        <button className='bg-red-netflix mt-12 py-5 px-28 text-white font-normal text-xl rounded flex items-center justify-center active:bg-red-netflix-active'>+ Add to Queue</button>
                    </div>
                    <div>
                        <img src={import.meta.env.VITE_PATH_POSTER + movie.poster_path} alt={movie.title} className='object-scale-down object-cover h-[400px] w-[800px]'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Moviedetail