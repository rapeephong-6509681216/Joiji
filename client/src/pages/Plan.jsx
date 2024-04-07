import React, { useContext } from 'react'
import { UserContext } from '../components/UserContext'

function Plan() {
    
    const { userInfo, setUserInfo } = useContext(UserContext)

  return (
    <div>{`Hello ${userInfo.username} again!`}</div>
  )
}

export default Plan