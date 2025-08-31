import React from 'react';
import AnimatedBackground from './shared/AnimatedBackground';
import Nav from './Nav';
import SearchNav from './shared/SearchNav';

const Home = () => {
    return (
        <div>
            <div className='h-80 flex flex-col '>
                <Nav></Nav>
                <div className='mt-20'>
                    <SearchNav ></SearchNav>                                           
                </div>
                <AnimatedBackground height={80} />
            </div>
            
        </div>
    );
};

export default Home;