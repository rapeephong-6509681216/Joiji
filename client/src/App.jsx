import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import SignUp from "./pages/SignUp";
import Plan from "./pages/Plan";
import Menu from "./pages/Menu";
import SignIn from "./pages/SignIn";
import Admin from "./pages/Admin";

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/Sign in' element={<SignIn />} />
          <Route path='/Sign up' element={<SignUp />} />
          <Route path='/Plan' element={<Plan />} />
          <Route path='/Menu' element={<Menu />} />
          <Route path='/Admin' element={<Admin />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
