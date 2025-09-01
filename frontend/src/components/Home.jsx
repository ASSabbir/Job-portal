import { useEffect, useState } from "react";
import Nav from "./Nav";


import SearchNav from "./shared/SearchNav";
import AnimatedBackground from "./shared/AnimatedBackground";
import JobCard from "./shared/JobCard";

const Home = () => {
    const [jobs, setJobs] = useState([]);

    // Default: fetch all jobs
    useEffect(() => {
        fetch("http://localhost:5000/jobs")
            .then((res) => res.json())
            .then((data) => setJobs(data));
    }, []);

    // Function triggered by SearchNav
    const handleSearch = (searchText, role) => {
        if (searchText) {
            fetch(`http://localhost:5000/jobs/search?title=${searchText}`)
                .then((res) => res.json())
                .then((data) => setJobs(data));
        } else {
            fetch(`http://localhost:5000/jobs/search?role=${role}`)
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
                <div className="grid grid-cols-3 gap-10  items-center justify-center  ">
                    {jobs.map((job) => <JobCard key={job._id} job={job}></JobCard>)}
                </div>
            </div>
        </div>
    );
};

export default Home;
