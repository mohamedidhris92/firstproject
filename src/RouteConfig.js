
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';//need to install this dependencies
import Home from './Home';
import SignUp from './SignUp';
import MyProfile from './MyProfile';
import Dashboard from './Dashboard/Dashboard';
import { UserDetails } from './Dashboard/UserDetails';

const RouteConfig = () => {

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} /> // this is the home page need to mention that in "/" path then only it will works
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/myprofile" element={<MyProfile/>} />
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/userdetails/:id" element={<UserDetails/>}/>
                    
                    {/* <Route path="/*" element={<Navigate to="/" />} /> */}
                </Routes>

            </div>
        </Router>
    );
};

export default RouteConfig;
