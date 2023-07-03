import React, {useState, useEffect } from 'react'
import RestaurantCard from './RestaurantCard';
import ShimmerContainer from './ShimmerContainer';
// Not using key(not acceptable) <<< index as key <<< unique id (best practice)
const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  console.log(searchText);
  useEffect(() => {
    fetchData();
  },[])
  
  const fetchData  = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    // Optional chaining
    setListOfRestaurant(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);

  }

  // Conditional Rendering

  // if (listOfRestaurant.length === 0){
  //   return <ShimmerContainer />;
  // }

    return listOfRestaurant.length === 0 ? (
      <ShimmerContainer />
    ) : (
      <div className="body">
        {/* {console.log("rendered")} */}
        <div className="filter">
          <div className="search">
            <input
              type="text"
              className="search-box"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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
                setListOfRestaurant(filteredList);
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
              <RestaurantCard restData={restaurant} key={restaurant.data.id} />
            );
          })}
        </div>
      </div>
    );
}

export default Body