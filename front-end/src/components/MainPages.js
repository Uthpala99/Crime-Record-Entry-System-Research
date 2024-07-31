import React, { useContext } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { GlobalState } from '../GlobalState';
import Login from './login/Login';
import Home from './Home';

const MainPages = () => {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

  return (
    <div className=''> 
    <Routes>
        
    <Route path='/' element={<Home />} />
    {/* <Route path='/admin' element={isAdmin&&<AdminPageShell />} /> */}

    <Route path='/signin' element={isLogged?<Navigate to={'/'}/>:<Login />} />
    {/* <Route path='/signup' element={isLogged?<Navigate to={'/'}/>:<Register />} /> */}

    {/* Profile */}
    {/* <Route path='/profile' element={isLogged&&<Profile />} />
    <Route path='/updateprofile' element={isLogged&&<UpadateProfile />} />
    <Route path='/createQuestion' element={isLogged?<CreateQuestion/>:<Navigate to={'/signin'}/>} /> */}

    </Routes>
  </div>
  )
}

export default MainPages