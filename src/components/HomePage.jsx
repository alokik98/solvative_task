import React, { useState, useEffect } from 'react';
import "./HomePage.css"
import Pagination from './Pagination';

const HomePage = () => {

    const [query, setQuery] = useState("");
    const [cities, setCities] = useState();
    const [limit, setLimit] = useState(5);
    const [timeoutId, updateTimeOut] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [citiesPerPage] = useState(3);

    const debounce = (event) => {
        clearTimeout(timeoutId)
        setQuery(event.target.value)
        const timeout = setTimeout(() => fetchUrl(event.target.value), 500)
        updateTimeOut(timeout)
    }

    const fetchUrl = async (query,limit) => {
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
        //console.log(data)
        if(!data.errors){
            setCities(data.data);
        }
    }

    console.log(cities)

    const totalLimit = (e) => {
        setLimit(e.target.value)
    }

    // const indexOfLastPage = currentPage * citiesPerPage;
    // const indexOfFirstPage = indexOfLastPage - citiesPerPage;

    // const currentCities = cities.slice(indexOfFirstPage, indexOfLastPage);

    // const nPages = Math.ceil( (cities.length) / citiesPerPage );

    useEffect(()=>{
        fetchUrl(query,limit)
    },[query,limit])

    return (
    <>
        <div className='search-box'>
            <input type='text' placeholder='Search places ...' value={query} onChange={debounce} />
        </div>
        {
            cities
            ?
                <div className='display-cities'>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>City</th>
                                <th>Country Flag</th>
                            </tr>
                        </thead>
                        <tbody>
                    
                        {cities.map((city,id) => {
                            return(
                                <tr key={id}>
                                <td>{id+1}</td>
                                <td>{city.city}</td>
                                <td>
                                    <img src={`https://countryflagsapi.com/png/${city.country}`} alt='Country-Flag' className='flag'
                                    loading='lazy'
                                    />
                                </td>
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            :
            <div className='no-data'>No data to display</div>
        }
        <div className='page-limit'>
            <div></div>
            {/* <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            /> */}
            <div className='limit'>
                <input type='number' min='1' max='10' value={limit} onChange={totalLimit} />
            </div>
        </div>
    </>
  )
}

export default HomePage;