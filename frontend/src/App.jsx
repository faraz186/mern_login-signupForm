import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import SignIn from "./pages/Login"

function App() {

  return (
    <Routes>
      <Route index element={<SignIn />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/home" element={<Home />}/>

    </Routes>
  )
}

export default App
