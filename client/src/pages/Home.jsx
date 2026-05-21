import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProperties } from '../services/property.service'

const Home = () => {

  const {data, isLoading, error} = useQuery({
    queryKey: ["properties"],
    queryFn: getProperties
  })

  if (isLoading) return <div>Loading properties...</div>

  if (error) return <div>Error loading properties</div>

  console.log(data)
    
  return (
    <div>
      <h1>Properties</h1>
      {
        data?.properties?.map((property) => (
          <div key={property._id} className='p-2 border rounded-lg my-4 hover:bg-gray-50 transition-colors cursor-pointer'>
            <p>{property.title}</p>
            <p>{property.description}</p>
            <p>{property.price}</p>
            <p>{property.location}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Home