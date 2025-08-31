import { useContext, useState } from 'react';

import Swal from 'sweetalert2';
import axios from 'axios';
import { AuthContext } from '../config/AuthProvider';
const AddJob = () => {
    const [role, setRole] = useState("Select a skills");
        const roles = [
            "Select a skills",
            "Web Developer",
            "Software Engineer",
            "UI/UX Designer",
            "Mobile App Developer",
            "Data Scientist",
        ];
    const { user } = useContext(AuthContext);
    if (!user) {
        return <div className='flex items-center justify-center w-full pt-2 h-screen'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    const handelSerssion = async (e) => {
        e.preventDefault();
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
        const formData = new FormData();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const salary = e.target.salary.value;
        const responsibilities = e.target.Responsibilities.value;
        const deadline = e.target.deadline.value;
        const joiningDate = e.target.joiningDate.value;
        const role = e.target.role.value;
        const email = user.email;
        const username = user.displayName;
        const photoFile = e.target.photo.files[0];
        // Logging the values to the console for testing
        if (title === '' || description === '' || salary == '' || responsibilities == '' || deadline == '' || joiningDate == '' || role == '') {
            Toast.fire({
                icon: "error",
                title: 'All fields must be filled out.'
            });

            return
        }
        const job = {
            title,
            description,
            salary,
            responsibilities,
            deadline,
            joiningDate,
            role,
            email,
            username

        }
        console.log(job)
        Swal.fire({
            title: "Are you Sure ?",
            text: "Please check once before submitting",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Check",
            confirmButtonColor: "#4a7fce",

            cancelButtonColor: "#262d53",
            confirmButtonText: "Yes, Post it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log('inside')
                formData.append('image', photoFile);
                const response = await axios.post('https://api.imgbb.com/1/upload?key=9bb7645922ca992881ce70f0bac1f069', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                
                const url = response.data.data.display_url;
                

                const jobDetails = { ...job, photo: url }
                console.log(jobDetails)
                axios.post('http://localhost:5000/add_job', jobDetails)
                    .then(res => {

                        if (res.data.acknowledged == true) {
                            Swal.fire({
                                title: "Post Done!",
                                text: "Your file has been Saved",
                                icon: "success"
                            });
                            console.log(res.data)
                        }
                    })

            }
        });
    };

    return (
        <section className="p-6 b  text-gray-400 ">
            <div className={`absolute inset-0 -z-10   overflow-hidden bg-[#001a00]`}>
                <div className="absolute w-[30%] h-[30%] -top-10 -left-10 rounded-full opacity-50 blur-xl animate-mesh-1"></div>
                <div className="absolute w-[20%] h-[20%] -bottom-10 -right-10 rounded-full opacity-50 blur-xl animate-mesh-2"></div>
            </div>
            <form onSubmit={handelSerssion} className="container flex flex-col mx-auto space-y-12">

                <div className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm ">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="font-medium text-xl font-Noto">Job Information</p>
                        <p className="text-xs  font-Noto">Provide the key details about the job you are posting, including title, category, type (full-time/part-time/remote), location, salary range, and a brief description of the role. This helps applicants clearly understand the position and its requirements.</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        {/* title  */}
                        <div className="col-span-full sm:col-span-3">

                            <input name="title" type="text" placeholder="Title" className="w-full px-4 py-3    outline-none border-b-1 border-[#05AF2B]" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            {/* Description  */}
                            <input name="description" type="text" placeholder="Description" className="w-full px-4 py-3    outline-none border-b-1 border-[#05AF2B]" />
                        </div>
                        {/* salary  */}
                        <div className="col-span-full sm:col-span-3">

                            <input name="salary" type="number" placeholder="Salary per month" className="w-full px-4 py-3    outline-none border-b-1 border-[#05AF2B]" />
                        </div>
                        {/* Responsibilities  */}
                        <div className="col-span-full sm:col-span-3">

                            <input name="Responsibilities" type="text" placeholder="Responsibilities (separate by comma)" className="w-full px-4 py-3    outline-none border-b-1 border-[#05AF2B]" />
                        </div>
                        {/* deadline  */}
                        <div className="col-span-full sm:col-span-3 ">
                            <label className="text-sm">Deadline</label>
                            <input name="deadline" type="date" className="w-full px-4 py-3    outline-none border-b-1 border-[#05AF2B]" />
                        </div>
                        {/* joiningDate */}
                        <div className="col-span-full sm:col-span-3 ">
                            <label className="text-sm">Joining Date</label>
                            <input name="joiningDate" type="date" className="w-full px-4 py-3    outline-none border-b-1 border-[#05AF2B]" />
                        </div>
                        <div className="col-span-full sm:col-span-3 mt-15 ">
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                name='role'
                                className="bg-transparent text-gray-400 outline-none cursor-pointer  w-full px-4 py-3     border-b-1 border-[#05AF2B]"
                            >
                                {roles.map((r) => (
                                    <option key={r} value={r} className="bg-[#142414] text-white">
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1 text-sm col-span-full sm:col-span-3 mt-10">
                            <label htmlFor="photo" className="block ">Provide a photo</label>
                            <input type="file" name="photo" className="w-full px-4 py-3    outline-none border-b-1 border-[#05AF2B]" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm mt-15 ">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="font-medium text-xl font-Noto">Personal Information</p>
                        <p className="text-xs font-Noto ">As a tutor, this section showcases your personal information to help students know you better.</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm">Username</label>
                            <input disabled type="text" name="username" defaultValue={user ? user.displayName : 'Username'} className="w-full px-4 py-3    outline-none border-b-1 border-[#05AF2B]" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm">Email</label>
                            <input disabled type="email" defaultValue={user ? user.email : 'Email'} className="w-full px-4 py-3    outline-none border-b-1 border-[#05AF2B]" />
                        </div>
                    </div>
                </div>
                <div className="p-6 rounded-md shadow-sm ">
                    <button type="submit" className="px-4 text-xl font-Noto py-2 w-full hover:bg-color1 hover:text-white  border-gray-800 block  p-3 text-center rounded-sm text-white bg-[#05AF2B] hover:bg-green-500 ">
                        Add Job
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AddJob;