import React from 'react'
import CreateSprints from './CreateSprints'
import Dashboard from './Dashboard'
import {Route,Routes} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import PrivateRoute from '../Components/PrivateRoute'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<PrivateRoute><Home></Home></PrivateRoute>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/sprint" element={<PrivateRoute><CreateSprints></CreateSprints></PrivateRoute>}></Route>
        <Route path="/dashboard/:sprintID" element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}></Route>
    </Routes>
  )
}

export default AllRoutes