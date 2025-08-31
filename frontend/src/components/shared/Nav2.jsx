import logo from '/logo.png'
import { PiWindowsLogo } from 'react-icons/pi';
import  { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import Swal from 'sweetalert2';
import { AuthContext } from '../../config/AuthProvider';

const Nav2 = () => {
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
        console.log(user)
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
            <div className={`absolute inset-0 -z-10 h-19  overflow-hidden bg-[#001a00]`}>
      <div className="absolute w-[30%] h-[30%] -top-10 -left-10 rounded-full opacity-50 blur-xl animate-mesh-1"></div>
      <div className="absolute w-[20%] h-[20%] -bottom-10 -right-10 rounded-full opacity-50 blur-xl animate-mesh-2"></div>
    </div>
            <div className="navbar max-w-[1400px] mx-auto border-b-1 border-[#212b18] ">
                <div className="flex-1 flex  items-center gap-3">
                    <img src={logo} alt="" className='w-56'/>
                    <div className='text-[#05AF2B] flex items-center border-2 justify-center h-7 p-3 rounded-4xl'>
                        <PiWindowsLogo />
                        <h1>Categoris</h1>
                    </div>
                </div>
                <div className="flex gap-7 items-center">
                    <input type="text" placeholder="Search" className="input  bg-transparent border-1 border-[#212b18] text-white w-44 p-5 md:w-auto" />
                    
                   
                    <NavLink className='text-[#05AF2B] tracking-widest '>BECAME A SELLER</NavLink>
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
                                                <div className='flex items-center gap-7'>
                                                    <NavLink to={'/login'} className='text-white cursor-pointer tracking-widest '>LOGIN</NavLink>
                                        <NavLink to={'/register'} className='text-white cursor-pointer bg-[#05AF2B] px-3 py-1 rounded-full tracking-widest '>Registration</NavLink>
                                                </div>
                            
                                        }
                </div>
            </div>
        </div>
    );
};

export default Nav2;