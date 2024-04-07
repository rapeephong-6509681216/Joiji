import React, { userState, createContext } from 'react'
import Signup from '../pages/Signup'

export const UserContext = createContext();

function User() {
    const [user, setUser] = userState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        addressLine: '',
        city: '',
        country: '',
        zipcode: ''
    })

  return (
    <UserContext.Provider value={{ user, setUser }}>
    </UserContext.Provider>
  )
}

export default User