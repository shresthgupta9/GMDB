import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Search = () => {
    const location = useLocation();

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const query = location.search.slice(3);

            if (query.length > 0) {
                const response = await axios.get("/game/search", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    params: { q: location.search.slice(3) }
                });

                setData(response.data.data);
            }

        } catch (err) {
            console.log("Search Error", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [location?.search]);

    return (
        <div className='py-16'>
            <div className='container mx-auto'>
                <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h3>


                <div className="container mx-auto p-4">
                    {data.map((item, index) => (
                        <Link
                            to={item.url}
                            key={index}
                            className="flex justify-between items-center p-2 mb-2 max-w-md mx-auto bg-neutral-800 text-white shadow-lg rounded-xl transform transition-transform hover:scale-105 hover:bg-neutral-700"
                        >
                            <span className="text-base font-semibold">{item.name}</span>
                            <span className="text-sm text-gray-400">{item.resource_type}</span>
                        </Link>
                    ))}
                </div>


            </div>
        </div>
    )
}

export default Search;