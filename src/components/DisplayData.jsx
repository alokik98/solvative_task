import React from 'react';
import load from "./loading.gif";

const DisplayData = ({cities, loading}) => {
 if(loading){
        return (
                    <div className='loading'>
                        <img src={load} alt='loading...' />
                    </div>
                )
    }
  
    return (
        <>
            {
                cities 
                ?
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>City</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        cities.map((city,id) => {
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
                            })
                        }
                    </tbody>
                </table>
                :
                <div className='no-data'>
                    No data to Display
                </div>
            }
        </>
  )
}

export default DisplayData;