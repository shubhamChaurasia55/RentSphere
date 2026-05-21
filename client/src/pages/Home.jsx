import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProperties } from '../services/property.service'
import useAuthStore from '../features/auth/authStore'

const Home = () => {

  const { user, isAuthenticated } = useAuthStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["properties"],
    queryFn: getProperties
  })

  if (isLoading) return <div>Loading properties...</div>

  if (error) return <div>Error loading properties</div>

  console.log(data)

  return (
    <div>
      <h1>Home Page</h1>
      {
        isAuthenticated
          ? <h2>user name: {user?.name}</h2>
          : <h2>Not Logged In</h2>
      }

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