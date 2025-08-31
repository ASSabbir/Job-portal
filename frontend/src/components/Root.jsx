import React from 'react';
import Nav from './Nav';
import Home from './Home';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AnimatedBackground from './shared/AnimatedBackground';
import SearchNav from './shared/SearchNav';
import Nav2 from './shared/Nav2';

const Root = () => {
    const nav = useLocation()
    console.log(nav.pathname)
    return (
        <div>
            {
                nav.pathname==='/'? <div></div> :<Nav2></Nav2>
            }

            <Outlet></Outlet>
        </div>
    );
};

export default Root;