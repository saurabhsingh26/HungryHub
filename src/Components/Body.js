import React from 'react'
import RestaurantCard from './RestaurantCard';
import { resList } from '../RestaurantsList';
// Not using key(not acceptable) <<< index as key <<< unique id (best practice)
const Body = () => {
  return (
    <div className="body">
      <div className="search">Search bar</div>
      <div className="res-container">
        {resList.map((restaurant, index) => {
          return <RestaurantCard restData={restaurant} key={restaurant.data.id} />;
        })}
      </div>
    </div>
  );
}

export default Body