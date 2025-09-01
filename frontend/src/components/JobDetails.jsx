import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { BiCalendar, BiUser } from 'react-icons/bi';
import { FaDollarSign } from 'react-icons/fa';
import { RiMvAiLine } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const JobDetails = () => {
    const { id } = useParams()
    const nav = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    
    const { isPending, error, data: job, refetch } = useQuery({
        queryKey: [id, 'jobs'],
        queryFn: () =>
            fetch(`http://localhost:5000/job/${id}`).then((res) =>
                res.json(),
            ),
    })
    

    const handelDelete = (id) => {
        Swal.fire({
            title: "Are you Sure ?",
            text: "Please Think once before Deleting",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Wait",
            confirmButtonColor: "#4a7fce",
            cancelButtonColor: "#262d53",
            confirmButtonText: "Yes, Delete!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`http://localhost:5000/job/${id}`);

                    if (res.data.success) {
                        Swal.fire({
                            title: "Delete Done!",
                            text: res.data.message,
                            icon: "success"
                        });
                        nav("/"); // redirect home
                        refetch(); // reload data
                    } else {
                        Swal.fire("Not Found", res.data.message, "error");
                    }
                } catch (error) {
                    console.error("Delete error:", error);
                    Swal.fire("Error!", error.response?.data?.message || "Something went wrong.", "error");
                }
            }
        }).catch(err => {
            console.error("Swal error:", err);
        });
    };
    const openModal = () => {
        setFormData(job); // pre-fill form with existing job data
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(id)
        try {
            const res = await axios.put(`http://localhost:5000/job/${id}`, formData);

            if (res.data.success) {
                Swal.fire("Updated!", res.data.message, "success");
                setIsModalOpen(false);
                refetch();
            } else {
                Swal.fire("Error!", res.data.message, "error");
            }
        } catch (error) {
            console.error("Update error:", error);
            Swal.fire("Error!", error.response?.data?.message || "Something went wrong.", "error");
        }
    };
    if (isPending) return <div className='flex items-center justify-center w-full pt-2 h-screen'>
        <span className="loading loading-bars loading-lg"></span>
    </div>

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white l shadow-lg overflow-hidden">
                {/* Header Image */}
                <img
                    src={job.photo}
                    alt={job.title}
                    className="w-full h-80 object-cover"
                />

                {/* Content */}
                <div className="p-6 space-y-8">
                    {/* Title */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
                        <p className="text-sm text-gray-500">{job.role}</p>
                    </div>

                    {/* Salary & Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
                        <div className="flex items-center gap-2">
                            <FaDollarSign className="w-5 h-5 text-green-500" />
                            <span className="font-medium">${job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BiCalendar className="w-5 h-5 text-blue-500" />
                            <span>Deadline: {job.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BiCalendar className="w-5 h-5 text-purple-500" />
                            <span>Joining: {job.joiningDate}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Job Description</h2>
                        <p className="text-gray-600 ">
                            {job.description}
                        </p>
                    </div>

                    {/* Responsibilities */}
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Responsibilities</h2>
                        <p className="text-gray-600">{job.responsibilities}</p>
                    </div>

                    {/* Recruiter Info */}
                    <div className="p-4 border rounded-xl flex flex-col sm:flex-row items-center sm:items-start gap-4">
                        <img
                            src={job.photo}
                            alt={job.username}
                            className="w-16 h-16 rounded-full border"
                        />
                        <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <BiUser className="w-5 h-5 text-gray-500" />
                                {job.username}
                            </h3>
                            <p className="flex items-center gap-2 text-gray-600">
                                <RiMvAiLine className="w-5 h-5 text-gray-400" />
                                {job.email}
                            </p>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <div className="pt-4 flex items-center justify-between gap-10">
                        <button className="w-full md:w-auto px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-blue-700 transition">
                            Apply Now
                        </button>
                        <div className='flex flex-col gap-3 '>
                            <button onClick={openModal} className='underline text-xl cursor-pointer text-blue-700'>
                                Update
                            </button>
                            <button onClick={() => handelDelete(job._id)} className='underline text-xl cursor-pointer text-red-700'>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* ✅ Update Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl">
                        <h2 className="text-xl font-semibold mb-4">Update This job</h2>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <label htmlFor="">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title || ""}
                                onChange={handleInputChange}
                                placeholder="Job Title"
                                className="w-full p-2 border rounded"
                            />
                            <label htmlFor="">Salary</label>
                            <input
                                type="number"
                                name="salary"
                                value={formData.salary || ""}
                                onChange={handleInputChange}
                                placeholder="Salary"
                                className="w-full p-2 border rounded"
                            />
                            <label htmlFor="">Deadline</label>
                            <input
                                type="date"
                                name="deadline"
                                value={formData.deadline || ""}
                                onChange={handleInputChange}
                                placeholder="Deadline"
                                className="w-full p-2 border rounded"
                            />
                            <label htmlFor="">Deadline</label>
                            <textarea
                                name="description"
                                value={formData.description || ""}
                                onChange={handleInputChange}
                                placeholder="Description"
                                className="w-full p-2 border rounded"
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetails;