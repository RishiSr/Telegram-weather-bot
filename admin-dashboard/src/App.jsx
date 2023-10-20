import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homescreen from './pages/Homescreen';
import { MyContext } from './MyContext';
import Users from './pages/Users';
import HomeMng from './pages/HomeMng';
import Keys from './pages/Keys';
import Protect from './utils/Protect';

const App = () => {
  const [name, setName] = useState(null);
  const [adminToken, setAdminToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("adminToken") ? true : false)
  const [header, setHeader] = useState("User Management")
  const [val, setVal] = useState(1);
  useEffect(() => {
    if (window.location.pathname == "/home/users") {
      setVal(1);
    } else if (window.location.pathname == "/home/key") {
      setVal(2)
    }
  }, [window.location])


  return (
    <MyContext.Provider value={{ name, setName, adminToken, setAdminToken, header, setHeader, isLoggedIn, setIsLoggedIn }}>
      <Router>

        <Routes>
          <Route path='/' element={<Homescreen />} />
          <Route path='/home' element={isLoggedIn ? <HomeMng /> : <Protect />} >
            <Route path='users' element={<Users />} />

            <Route path='key' element={<Keys />} />
          </Route>
        </Routes>

      </Router>

    </MyContext.Provider>

  )
}

export default App