import React from 'react';
import Nav from './Nav';
import Home from './Home';
import { Outlet } from 'react-router-dom';
import AnimatedBackground from './shared/AnimatedBackground';

const Root = () => {
    return (
        <div>
            <div className='h-80 '>
                <Nav></Nav>
                 <AnimatedBackground height={80} />
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;