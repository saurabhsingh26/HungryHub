import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import ShimmerContainer from './ShimmerContainer';
import useOnlineStatus from '../utils/useOnlineStatus';
import Spinner from './Spinner';
// import data from '../utils/RestaurantData';

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  },[])
  
  const fetchData  = async () => {
    // const data = await fetch(
    //   "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.6342587&lng=85.0584152&page_type=DESKTOP_WEB_LISTING"
    // );
    // const json = await data.json();
    
    // Not working for mobile devices
    // setListOfRestaurant(
    //   json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );
    // setFilteredRestaurants(
    //   json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );


    // New way to fetch api for mobile and desktop (testing)
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.6342587&lng=85.0584152&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    const restaurants = json.data.cards
      ?.filter(
        (y) =>
          y?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.gandalf.widgets.v2.GridWidget"
      )?.filter(
        (x) =>
          x?.card?.card?.id === "top_brands_for_you" ||
          x?.card?.card?.id === "restaurant_grid_listing"
      )?.map((z) => z?.card?.card?.gridElements?.infoWithStyle?.restaurants)
      
    setListOfRestaurant(restaurants[0]);
    setFilteredRestaurants(restaurants[0]);
  }

  const onlineStatus = useOnlineStatus();
  
  if (onlineStatus === false){
    return <h1 className='text-xl font-bold p-4 text-center text-red-500'>Looks like you're offline... Please check your internet connection!! </h1>
  }

  if (!listOfRestaurant) {
    return window.location.reload();
  }



  return listOfRestaurant.length === 0 ? (
    [<Spinner key={0} />, <ShimmerContainer key={1} />]
  ) : (
    <div className="body">
      {/* Filters  */}
      <div className="flex justify-center mt-20">
        <div className="flex flex-col justify-center w-[90%] ">
          <div className="flex justify-between items-center ">
            <div>
              <div
                style={{ color: "#282C3F" }}
                className="font-bold text-[28px] flex"
              >
                <p className="mr-1">{filteredRestaurants.length} </p>
                <p> Restaurants</p>
              </div>
            </div>
            <div className="invisible lg:visible overflow-hidden hover:cursor-pointer">
              <ul className="flex gap-0 lg:gap-8">
                <li
                  className="mx-1 text-[16px] font-medium"
                  style={{ color: "#686B78" }}
                  onClick={() => {
                    setFilteredRestaurants(listOfRestaurant);
                  }}
                >
                  Relevance
                </li>
                <li
                  style={{ color: "#686B78" }}
                  className="mx-1 text-[16px] font-medium"
                >
                  Delivery Time
                </li>
                <li
                  className="mx-1 text-[16px] font-medium"
                  style={{ color: "#686B78" }}
                  onClick={() => {
                    const filteredRating = listOfRestaurant.filter(
                      (res) => res.info.avgRating >= 4
                    );
                    setFilteredRestaurants(filteredRating);
                  }}
                >
                  Rating
                </li>
                <li
                  style={{ color: "#686B78" }}
                  className="mx-1 text-[16px] font-medium"
                >
                  Cost: Low To High
                </li>
                <li
                  style={{ color: "#686B78" }}
                  className="mx-1 text-[16px] font-medium"
                >
                  Cost: High To Low
                </li>
              </ul>
            </div>
          </div>
          <div className="border"></div>
        </div>
      </div>
      {/* Body Section */}
      <div className="flex flex-wrap justify-center">
        {filteredRestaurants.map((restaurant, index) => {
          return (
            <Link
              to={`/restaurant/${restaurant.info.id}`}
              key={restaurant.info.id}
            >
              {restaurant.info.promoted ? (
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

export default Body;