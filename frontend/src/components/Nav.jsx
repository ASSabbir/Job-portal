import React, { useContext } from 'react';
import logo from '/logo.png'
import { PiWindowsLogo } from 'react-icons/pi';
import AnimatedBackground from './shared/AnimatedBackground';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../config/AuthProvider';
import Swal from 'sweetalert2';
const Nav = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    const { user, logout } = useContext(AuthContext)
    
    const handelLogout = () => {
        logout()
            .then(() => {
                Toast.fire({
                    icon: "success",
                    title: `Bye See You Again`
                });
                localStorage.removeItem('user')
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (

        <div className=''>

            <div className="navbar max-w-[1400px] mx-auto border-b-1 border-[#212b18] ">
                <div className="flex-1 flex  items-center gap-3">
                    <NavLink to={'/'}><img src={logo} alt="" className='md:w-56 w-24' /></NavLink>
                    
                    <div className='text-[#05AF2B] hidden   md:flex items-center  border-2 justify-center h-7 p-3  rounded-4xl'>
                        <PiWindowsLogo />
                        <h1>Categoris</h1>
                    </div>
                </div>
                <div className="flex gap-2 md:gap-7 items-center text-[12px] md:text-base">
                    <input type="text" placeholder="Search" className="input  hidden   md:flex bg-transparent border-1 border-[#212b18] text-white w-44 p-5 md:w-auto" />
                    <NavLink to={'/add_job'} className='text-[#05AF2B] tracking-widest '>POST A JOB</NavLink>
                    
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar flex text-white  rounded-full  text-xl text-center bg-[#05AF2B]">
                                    {user?.email?.charAt(0).toUpperCase()}

                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                                    <li onClick={() => handelLogout()}>Logout</li>
                                </ul>
                            </div>
                            :
                            <div className='flex items-center gap-2 md:gap-7'>
                                <NavLink to={'/login'} className='text-white cursor-pointer tracking-widest '>LOGIN</NavLink>
                    <NavLink to={'/register'} className='text-white cursor-pointer bg-[#05AF2B] px-3 py-1 rounded-full tracking-widest '>Registration</NavLink>
                            </div>
        
                    }
                </div>
            </div>
        </div>
    );
};

export default Nav;