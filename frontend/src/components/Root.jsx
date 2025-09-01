import React from 'react';
import Nav from './Nav';
import Home from './Home';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AnimatedBackground from './shared/AnimatedBackground';
import SearchNav from './shared/SearchNav';
import Nav2 from './shared/Nav2';
import Footer from './Footer';

const Root = () => {
    const nav = useLocation()
    
    return (
        <div>
            {
                nav.pathname==='/'? <div></div> :<Nav2></Nav2>
            }

            <Outlet></Outlet>
            {
                nav.pathname==='/'? <div></div> :<Footer></Footer>
            }
            
        </div>
    );
};

export default Root;