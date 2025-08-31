

import logo from '/logo.png'
import { PiWindowsLogo } from 'react-icons/pi';

const Nav2 = () => {
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
                    <button className='text-[#05AF2B] tracking-widest '>BECAME A SELLER</button>
                    <button className='text-white cursor-pointer tracking-widest '>LOGIN</button>
                    <button className='text-white cursor-pointer bg-[#05AF2B] px-3 py-1 rounded-full tracking-widest '>Registration</button>
                    {/* <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Nav2;