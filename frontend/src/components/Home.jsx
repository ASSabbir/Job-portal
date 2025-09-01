import { useEffect, useState } from "react";
import Nav from "./Nav";


import SearchNav from "./shared/SearchNav";
import AnimatedBackground from "./shared/AnimatedBackground";
import JobCard from "./shared/JobCard";
import Footer from "./Footer";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
    const [jobs, setJobs] = useState([]);

    // Default: fetch all jobs
    useEffect(() => {
        fetch("https://backend-dun-omega-67.vercel.app/jobs")
            .then((res) => res.json())
            .then((data) => setJobs(data));
    }, []);


    // Function triggered by SearchNav
    const handleSearch = (searchText, role) => {
        if (searchText) {
            fetch(`https://backend-dun-omega-67.vercel.app/jobs/search?title=${searchText}`)
                .then((res) => res.json())
                .then((data) => setJobs(data));
        } else {
            fetch(`https://backend-dun-omega-67.vercel.app/jobs/search?role=${role}`)
                .then((res) => res.json())
                .then((data) => setJobs(data));
        }
    };

    return (
        <div className="h-80 relative flex flex-col">
            <Nav />
            <div className="mt-20">
                <SearchNav onSearch={handleSearch} />
            </div>
            <AnimatedBackground height={80} />

            {/* Job Cards */}
            <div className="mx-auto max-w-[1440px] mt-44">
                <h1 className="text-3xl font-bold ml-10 mb-5"> <span>{jobs.length}</span> search results found</h1>
                {
                    jobs.length == 0 ?
                        <div className='flex items-center justify-center w-full pt-2 min-h-96'>
                            <span className="loading loading-bars loading-lg"></span>
                        </div>
                        :
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10  items-center justify-center  ">
                            {jobs.map((job) => <JobCard key={job._id} job={job}></JobCard>)}
                        </div>

                }

            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;
