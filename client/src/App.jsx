import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./components/UserContext";
import Home from "./pages/Home"
import SignUp from "./pages/Signup";
import Plan from "./pages/Plan";
import Menu from "./pages/Menu";

function App() {

  const [userInfo, setUserInfo] = useState({
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
    <BrowserRouter>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/Sign up' element={<SignUp />} />
          <Route path='/Plan' element={<Plan />} />
          <Route path='/Menu' element={<Menu />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
