import React from 'react'
import { CDN_URL } from '../utils';

const RestaurantCard = (props) => {
  const { restData } = props;
  const {
    name,
    cuisines,
    avgRating,
    cloudinaryImageId,
    deliveryTime,
    costForTwo,
  } = restData?.data;
  return (
    <div className="m-5 p-2 w-[350px] rounded-2xl  hover:bg-red-50 hover:shadow-md">
      {/* {console.log(`CDN_URL/${cloudinaryImageId}`)} */}
      <img
        className="res-logo rounded-2xl"
        src={`${CDN_URL}/${cloudinaryImageId}`}
        alt="site-logo"
      />
      <div className="res-name flex justify-between">
        <div>
          <h4 className="font-medium text-lg my-3 truncate  w-36">{name}</h4>
          <p className="text-sm truncate  w-32">{cuisines.join(", ")}</p>
        </div>
        <div className="rating-container flex flex-col items-end my-3">
          <p className="star-rating bg-green-500 w-7 rounded-md text-center my-1">
            {avgRating}
          </p>
          <p style={{ color: "#535665" }}>₹{costForTwo / 100} for two</p>
          <p style={{ color: "#535665" }}>{deliveryTime} min</p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard