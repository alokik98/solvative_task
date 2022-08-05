import React, { useState, useEffect } from 'react';
import "./HomePage.css"

const HomePage = () => {

    const [query, setQuery] = useState("");
    const [cities, setCities] = useState();
    const [timeoutId, updateTimeOut] = useState()

    const debounce = (event) => {
        clearTimeout(timeoutId)
        setQuery(event.target.value)
        const timeout = setTimeout(() => fetchUrl(event.target.value), 500)
        updateTimeOut(timeout)
    }

    const fetchUrl = async (query) => {
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?`;

        const res = await fetch(url + new URLSearchParams({
            namePrefix: query
        }),{
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "d101490876msh46d4c72515dfee0p1e43fejsn5537c6de53c2",
                "X-RapidAPI-Host" : 'wft-geo-db.p.rapidapi.com'
            },
        });

        const data = await res.json()
        console.log(data)
        if(!data.errors){
            setCities(data.data);
        }
    }  


    useEffect(()=>{
        fetchUrl(query)
        // eslint-disable-next-line
    },[setQuery])

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
                                    <img src={`https://countryflagsapi.com/png/${city.country}`} alt='Country-Flag' className='flag'/>
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
    </>
  )
}

export default HomePage;