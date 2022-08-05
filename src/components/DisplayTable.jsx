import React, { useEffect, useState} from 'react'

const DisplayTable = (props) => {
    const {query} = props;
    const [cities, setCities] = useState([]);

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
        if(!data.errors){
            setCities(data.data);
            console.log(cities)
        }
    }  

    useEffect(()=>{
        fetchUrl(query)
        // eslint-disable-next-line
    },[query])
        
    if(cities === []){
            return (
                <div>No data to display</div>
            )
    }
    else
    {
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>City</th>
                            <th>Country Flag</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cities.map((city,id) => {
                                return(
                                    <tr key={id}>
                                    <td>{id+1}</td>
                                    <td>{city.city}</td>
                                    <td>{city.country}</td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
export default DisplayTable;