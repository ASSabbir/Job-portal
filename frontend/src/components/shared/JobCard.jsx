import React from 'react';
import { BiUser } from 'react-icons/bi';
import { FaDollarSign } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const JobCard = ({ job }) => {
    const today = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

   
    return (
        <div className=" w-full rounded-lg hover:shadow-2xl duration-300 p-4 space-y-7">
            <h1 className='text-gray-600 ml-5'>{today}</h1>
            

            {/* Title */}
            <div className="space-y-2">
                <h2 className="text-xl font-semibold  ">
                    {job.title}
                </h2>

                {/* Salary */}
                <div className="flex items-center justify-between text-gray-500 bg-gray-100  px-5 py-3 rounded-lg">
                    <span className="flex items-center gap-1  text-sm">
                        <FaDollarSign className="w-4 h-4" /> Salary
                    </span>
                    <span className="font-medium">${job.salary}</span>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500  line-clamp-3">
                {job.description}
            </p>

            {/* Extra Info */}
            <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                    {job.role}
                </span>
                <span className="px-2 py-1 rounded-full bg-red-100 text-red-700">
                    Deadline: {job.deadline}
                </span>
                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">
                    Joining: {job.joiningDate}
                </span>
            </div>

            {/* Posted By */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <BiUser className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500 ">
                        {job.username}
                    </span>
                </div>
                <NavLink to={`/job/${job._id}`} className="px-4 py-2 bg-green-600 text-white text-sm duration-300 rounded- hover:bg-gray-800">
                    Details
                </NavLink>
            </div>
        </div>
    );
};

export default JobCard;