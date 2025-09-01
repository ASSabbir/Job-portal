import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchNav = ({ onSearch }) => {
    const [searchText, setSearchText] = useState("");
    const [role, setRole] = useState("Web Developer");

    const roles = [
        "Web Developer",
        "Software Engineer",
        "UI/UX Designer",
        "Mobile App Developer",
        "Data Scientist",
    ];

    const handleSearch = () => {
        onSearch(searchText, role);
        console.log(searchText,role)
    };

    return (
        <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center flex-col md:flex-row gap-2">
                {/* Input field with dropdown + icon */}
                <div className="flex items-center bg-[#142414] rounded-lg px-2 py-2 md:px-7 md:py-4 w-auto md:w-[550px]">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search your needs"
                        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
                    />

                    {/* Dropdown inside input */}
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="bg-transparent text-gray-300 w-32 md:w-auto outline-none cursor-pointer ml-2"
                    >
                        {roles.map((r) => (
                            <option key={r} value={r} className="bg-[#142414] text-white">
                                {r}
                            </option>
                        ))}
                    </select>

                    {/* Search icon */}
                    <button
                        onClick={handleSearch}
                        className="ml-2 bg-[#05AF2B] cursor-pointer w-10 h-10 flex justify-center items-center rounded-full text-white"
                    >
                        <FiSearch size={20} />
                    </button>
                </div>

                {/* Advanced Search button */}
                <button className="bg-[#05AF2B] hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium">
                    Advanced search
                </button>
            </div>
        </div>
    );
};

export default SearchNav;