import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import offers from '../utils/OffersNearMe';
import RestaurantCard from './RestaurantCard';
import { withOfferLabel } from './RestaurantCard';


const OfferCard = () => {
  const [offersRestaurants, setOffersRestaurants] = useState([]);
  const RestaurantCardOffer = withOfferLabel(RestaurantCard);
  
  document.title = "Restaurants With Great Offers Near You";
  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setOffersRestaurants(
      offers?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };



  return (
    <div className="flex flex-col">
        <div style={{color: '#02060CEB'}} className="text-2xl font-bold mt-8 mb-6 mx-16">Restaurants With Great Offers Near You</div>
        <div className="flex flex-wrap justify-center">
          {offersRestaurants.map((restaurant, index) => {
            return (
              <Link
                to={`/restaurant/${restaurant.info.id}`}
                key={restaurant.info.id}
              >
                {restaurant.info.offer ? (
                  <RestaurantCardOffer restData={restaurant} />
                ) : (
                  <RestaurantCard restData={restaurant} />
                )}
              </Link>
            );
          })}
        </div>
      </div>
  );
}

export default OfferCard;