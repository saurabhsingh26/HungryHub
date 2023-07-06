import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';
import ShimmerContainer from './ShimmerContainer';


const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  useEffect(() => {
    fetchData();
  },[])
  
  const fetchData  = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setListOfRestaurant(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);

  }

    return listOfRestaurant.length === 0 ? (
      <ShimmerContainer />
    ) : (
      <div className="body">
        <div className="filter">
          <div className="search">
            <input
              type="text"
              className="search-box"
              value={searchText}
              onChange={(e) => {setSearchText(e.target.value)}}
            />
            <button
              onClick={() => {
                const filteredRestaurants = listOfRestaurant.filter((res) =>
                  res.data.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredRestaurants(filteredRestaurants);
              }}
            >
              Search
            </button>
          </div>
          <div className="filter-btns">
            <button className="filter-btn">Filters</button>
            <button
              className="filter-btn"
              onClick={() => {
                const filteredList = listOfRestaurant.filter(
                  (res) => res.data.avgRating > 4
                );
                setFilteredRestaurants(filteredList);
              }}
            >
              Rating: 4+
            </button>
            <button className="filter-btn">Pure Veg</button>
            <button className="filter-btn">Delivery Time</button>
          </div>
        </div>
        <div className="res-container">
          {filteredRestaurants.map((restaurant, index) => {
            return (
              <Link
                to={`/restaurant/${restaurant.data.id}`}
                key={restaurant.data.id}
              >
                <RestaurantCard restData={restaurant} />
              </Link>
            );
          })}
        </div>
      </div>
    );
}

export default Body