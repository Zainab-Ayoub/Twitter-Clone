import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/signup/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";

function App() {

  return (
    <>
      <div className='flex max-w-6xl mx-auto'>
        <Routes>
          <Route path="/" element={<HomePage />} />  
          <Route path="/" element={<LoginPage />} />  
          <Route path="/" element={<SignUpPage />} />  
        </Routes> 
      </div>
    </>
  )
}

export default App
