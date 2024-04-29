
import React, { Fragment } from 'react'
import Queuebar from '../components/Queuebar'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import Home2 from '../components/Home2' 
import Queue3 from '../components/Queue3'

function Queue() {

    const [homeData, setHomeData] = useState ([]);
    const [queueData, setQueueData] = useState ([]);
    const [page, setPages] = useState('All');
    const [searchData, setSearchData] = useState('')
  
    const user = sessionStorage.getItem('user')

     useEffect(() => {
          
        fetch(`${import.meta.env.VITE_API_URL}/orders/shipped/${user}`)
          .then(response => response.json())
          .then(datahome => {
            setHomeData(datahome)
          })
          .catch(error => console.error('Error:', error));
        } , [homeData]);

        useEffect(() => {
          
          fetch(`${import.meta.env.VITE_API_URL}/orders/booking/${user}`)
            .then(response => response.json())
            .then(dataqueue => {
              setQueueData(dataqueue)
            })
            .catch(error => console.error('Error:', error));
          } , [queueData]);
          
      useEffect(() => {
        if (searchData != '') {
          fetch(`${import.meta.env.VITE_API_URL}/movies/search/${searchData}`)
          .then(response => response.json())
          .then(movieData => {
            setMovies(movieData)
          })
          .catch(error => console.error('Error:', error));
        }
      }, [searchData]);



    const renderContent = () => {
      if (page === 'All') {
        return (
        <>
        <Home2 homeData={homeData} />
        <Queue3 queueData={queueData}/> 
        </> )
      } else if (page === 'Home2') {
          return <Home2 homeData={homeData} /> 
      } else if (page === 'Queue3') {
          return <Queue3 queueData={queueData} />
      } else if (page === 'History') {}
  };



      return (
        <Fragment>
          <Navbar setSearchData={setSearchData} />
          <Queuebar setPages={setPages} />
          <div> 
          {renderContent()}
          </div>
          
        </Fragment>
      );
}

export default Queue