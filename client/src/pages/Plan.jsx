import React, { useContext } from 'react'
import { UserContext } from '../components/UserContext'

function Plan() {
    
  const user = sessionStorage.getItem('user');

  return (
    <div>{`Hello ${user} again!`}</div>
  )
}

export default Plan