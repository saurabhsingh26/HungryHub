import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import ShimmerContainer from './ShimmerContainer';
import useOnlineStatus from '../utils/useOnlineStatus';


const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  useEffect(() => {
    fetchData();
  },[])
  
  const fetchData  = async () => {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setListOfRestaurant(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);

  }

  const onlineStatus = useOnlineStatus();
  
  if (onlineStatus === false){
    return <h1>Looks like you're offline!! Please check your internet connection </h1>
  }

  return listOfRestaurant.length === 0 ? (
    <ShimmerContainer />
  ) : (
    <div className="body">
      <div className="flex m-4">
        <div>
          <input
            type="text"
            className="search-box p-2 outline"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 mx-2 py-2 bg-green-200 rounded-xl"
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
          <button className="filter-btn px-4 mx-2 py-2 bg-gray-100">
            Filters
          </button>
          <button
            className="filter-btn"
            onClick={() => {
              const filteredList = listOfRestaurant.filter(
                (res) => res.data.avgRating > 4
              );
              setFilteredRestaurants(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
          <button className="filter-btn">Pure Veg</button>
          <button className="filter-btn">Delivery Time</button>
        </div>
      </div>
      <div className="res-container flex flex-wrap justify-center">
        {filteredRestaurants.map((restaurant, index) => {
          return (
            <Link
              to={`/restaurant/${restaurant.data.id}`}
              key={restaurant.data.id}
            >
              {restaurant.data.promoted ? (
                <RestaurantCardPromoted restData={restaurant} />
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

export default Body