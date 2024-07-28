import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from '../components/Card';

const Explore = () => {
    const params = useParams();

    const [pageNo, setPageNo] = useState(1);
    const [data, setData] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const field = params.explore === "playlist" ? "toPlay" : "finished";

    // console.log("params", params.explore);

    const fetchData = async () => {
        try {
            const response = await axios.get(`/game/${params.explore}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                params: { page: pageNo }
            });

            // console.log(response.data.data);

            setData((prev) => {
                const toPlay = response?.data?.data?.toPlay || [];
                const finished = response?.data?.data?.finished || [];

                const final = toPlay.length === 0 ? finished : toPlay;
                return [...prev, ...final];
            });
            setTotalPage(response.data.data.totalPages);

            // console.log(response.data.data.totalPages);

        } catch (err) {
            console.log(err);
        }
    };

    const handleScroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setPageNo(prev => prev + 1);
        }
    };

    useEffect(() => {
        fetchData();
    }, [pageNo]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setPageNo(1);
        setData([]);
        fetchData();
    }, [params.explore]);

    return (
        <div className='py-16'>
            <div className='container mx-auto'>
                <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Your {params.explore}</h3>

                <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
                    {
                        data.map((exploreData, index) => {
                            return (
                                <Card data={exploreData} key={exploreData.id + index} />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Explore