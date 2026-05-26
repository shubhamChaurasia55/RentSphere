import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from 'react-router-dom'

import { getProperties } from "../services/property.service";

import PropertyGrid from "../components/property/PropertyGrid";
import SearchBar from "../components/search/SearchBar";
import FilterSidebar from "../components/search/FilterSidebar";


import Hero from "../components/common/HeroSection";
import PropertySearchBar from "../components/common/PropertySearchBar";

const Home = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = Object.fromEntries(

    [...searchParams]

  );


  const {

    data,

    isLoading,

    error

  } = useQuery({

    queryKey: ["properties", queryParams],

    queryFn: () => getProperties(queryParams)

  });

  if (isLoading) {

    return (

      <div className="p-10">

        Loading properties...

      </div>

    );

  }

  if (error) {

    return (

      <div className="p-10">

        Failed to load properties

      </div>

    );

  }

  if (!data?.properties?.length) {

    return (

      <div className="p-10">

        No properties found

      </div>

    );

  }

  return (
    <>
    <Hero />
    <PropertySearchBar />

    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="grid grid-cols-12 gap-8">

        <div className="col-span-3">

          <FilterSidebar />

        </div>

        <div className="col-span-9 flex flex-col gap-6">

          <SearchBar />

          <PropertyGrid
            properties={data?.properties || []}
          />

        </div>

      </div>


    </div>
    </>

  );

};

export default Home;