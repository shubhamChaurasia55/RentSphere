import React from "react";

// Components
import Hero from "../components/common/HeroSection";
import PropertyCarousel from "../components/home/PropertyCarousel";

const Home = () => {
  return (
    <div className="min-h-screen bg-white pb-20">

      {/* HERO */}
      <Hero />

      {/* MAIN CONTENT */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10">

        <div className="flex flex-col gap-10">

          <PropertyCarousel
            title="Top Rated Apartments"
            filters={{
              category: "Apartments",
              sort: "-averageRating",
            }}
            viewAllLink="/properties?category=Apartments"
          />

          <PropertyCarousel
            title="Luxurious Villas"
            filters={{
              category: "Villas",
            }}
            viewAllLink="/properties?category=Villas"
          />

          <PropertyCarousel
            title="Beachfront Escapes"
            filters={{
              category: "Beachfront",
            }}
            viewAllLink="/properties?category=Beachfront"
          />

          <PropertyCarousel
            title="Cozy Homes & Cabins"
            filters={{
              category: "Houses",
            }}
            viewAllLink="/properties?category=Houses"
          />

          <PropertyCarousel
            title="Newest Listings"
            filters={{
              sort: "-createdAt",
            }}
            viewAllLink="/properties"
          />

        </div>
      </div>
    </div>
  );
};

export default Home;