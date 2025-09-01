
import { NavLink } from 'react-router-dom';
import img1 from '/1.png'
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../config/AuthProvider';
import { auth } from '../config/firebase.config';



const Signup = () => {
    const { handelSignup, googleSign } = useContext(AuthContext)

    const navg = useNavigate()
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


    // from submit function 
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const confirmpassword = e.target.confirmpassword.value;
        const password = e.target.password.value;
        console.log(password)

        if (email === '' || password === '' || confirmpassword == '') {
            Toast.fire({
                icon: "error",
                title: 'All fields must be filled out.'
            });

            return
        }
        if (password !== confirmpassword) {
            Toast.fire({
                icon: "error",
                title: "Password don't match"
            });

            return
        }
        const data = { email, password }
        axios.post('https://backend-dun-omega-67.vercel.app/add_user', data)
            .then(res => console.log(res.data))
            .catch(error => { console.log(error) })





        // handel firebase
        handelSignup(email, password)
            .then(user => {
                Toast.fire({
                    icon: "success",
                    title: `WelCome ${auth.currentUser.email} `
                });
                const data = { email, password }
                axios.post('https://backend-dun-omega-67.vercel.app/add_user', data)
                    .then(res => console.log(res.data))
                    .catch(error => { console.log(error) })
                navg(location.state ? location.state : '/')
                
            })
            .catch(error => {
                Toast.fire({
                    icon: "error",
                    title: error
                });

            })
    };
    const handelgoogle = () => {
        googleSign()
            .then((user2) => {
                Toast.fire({
                    icon: "success",
                    title: `WelCome ${user2.user.displayName} `
                });
                const email = user2.user.email

                const data = { email, password: 'google' }
                console.log(data)
                axios.post('https://backend-dun-omega-67.vercel.app/add_user', data)
                    .then(res => console.log(res.data))
                    .catch(error => { console.log(error) })
                navg(location.state ? location.state : '/')
                

            })
            .catch(error => {
                Toast.fire({
                    icon: "error",
                    title: error.code
                });
                console.log(error)
            })
    }
    const handelTwiter= () => {

        Swal.fire({
            title: "Coming Soon",
            text: "Twitter login integration will be available in the next update.",
            icon: "info"
        });
    }
    return (
        <div>

            <div className='flex justify-center items-center'>
                <div className='flex flex-row-reverse relative text-white px-6 py-6 md:px-40 md:py-20 gap-30  justify-center items-center  mt-20'>

                    <div className={`absolute inset-0 -z-10   overflow-hidden bg-[#001a00]`}>
                        <div className="absolute w-[30%] h-[30%] -top-10 -left-10 rounded-full opacity-50 blur-xl animate-mesh-1"></div>
                        <div className="absolute w-[20%] h-[20%] -bottom-10 -right-10 rounded-full opacity-50 blur-xl animate-mesh-2"></div>
                    </div>
                    <div className={`w-full bg-cover bg-center max-w-md md:p-8
                         space-y-5 rounded-xl    `}>

                        <h1 className="text-4xl font-bold text-center">Open your account</h1>
                        <p className="text-xs text-center sm:px-6 ">Already have an account?
                            <NavLink to={'/login'} className="underline text-[#05AF2B] "> Sign in</NavLink>

                        </p>
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            <div className="space-y-1 text-sm">
                                <label htmlFor="email" className="block ">Email</label>
                                <input type="email" name="email" id="email" placeholder="Email" className="w-full px-4 py-3    outline-none border-b-1 border-[#05AF2B]" />
                            </div>
                            <div className="space-y-1 text-sm">
                                <label htmlFor="password" className="block ">Password</label>
                                <input type="password" name="password" placeholder="Password" className="w-full px-4 py-3    outline-none border-b-1 border-[#05AF2B]" />

                            </div>
                            <div className="space-y-1 text-sm">
                                <label htmlFor="password" className="block ">Confirm Password</label>
                                <input type="password" name="confirmpassword" placeholder="Password" className="w-full px-4 py-3    outline-none border-b-1 border-[#05AF2B]" />

                            </div>
                            <button className="block w-full p-3 text-center rounded-sm text-white bg-[#05AF2B] hover:bg-green-500 ">Sign Up</button>
                        </form>
                        <div className="flex items-center pt-4 space-x-1">
                            <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                            <p className="px-3 text-sm ">Login with social accounts</p>
                            <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                        </div>
                        <div className="flex justify-center space-x-4">
                            <button onClick={handelgoogle} aria-label="Log in with Google" className="p-3 cursor-pointer rounded-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current ">
                                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                                </svg>
                            </button>
                            <button onClick={()=>handelTwiter()} aria-label="Log in with Twitter" className="p-3 rounded-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                    <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
                                </svg>
                            </button>

                        </div>

                    </div>
                    <div className='hidden md:flex'>
                        <img src={img1} alt="" className='w-96' />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Signup;