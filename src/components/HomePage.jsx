import React, { useState, useEffect } from 'react';
import "./HomePage.css"
import DisplayData from './DisplayData';
import Pagination from './Pagination';

const HomePage = () => {

    const [query, setQuery] = useState("");
    const [cities, setCities] = useState([]);
    const [limit, setLimit] = useState(5);
    const [timeoutId, updateTimeOut] = useState();
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [citiesPerPage] = useState(3);

    const debounce = (event) => {
        clearTimeout(timeoutId)
        setQuery(event.target.value)
        const timeout = setTimeout(() => fetchUrl(event.target.value), 500)
        updateTimeOut(timeout)
    }

    const fetchUrl = async (query,limit) => {
        setLoading(true)
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?`;
        

        const res = await fetch(url + new URLSearchParams({
            limit: limit,
            namePrefix: query,
        }),{
            method: "GET",
            headers: {
                "X-RapidAPI-Key": process.env.REACT_APP_GEODB_KEY,
                "X-RapidAPI-Host" : 'wft-geo-db.p.rapidapi.com'
            },
        });

        const data = await res.json()
        if(!data.errors){
            setCities(data.data);
        }
        setLoading(false)
    }

    const totalLimit = (e) => {
        setLimit(e.target.value)
    }

    useEffect(()=>{
        fetchUrl(query,limit)
    },[query,limit])

    const indexOfLastCity = currentPage * citiesPerPage;
    const indexOfFirstCity = indexOfLastCity - citiesPerPage;
    const currentCities = cities.slice(indexOfFirstCity,indexOfLastCity);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return (
    <>
        <div className='search-box'>
            <input type='text' placeholder='Search places ...' value={query} onChange={debounce} />
        </div>
         
        <DisplayData cities={currentCities} loading={loading} />
        <Pagination limit={limit} citiesPerPage={citiesPerPage} totalCities={cities.length} paginate={paginate} />
        <div className='limit'>
            <label>Set Limit :</label><input type='number' value={limit} onChange={totalLimit} />
        </div>
    </>
  )
}

export default HomePage;