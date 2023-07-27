import React from 'react'
import { CDN_URL } from '../utils';

const RestaurantCard = (props) => {
  const { restData } = props;
  const {
    name,
    cuisines,
    avgRating,
    cloudinaryImageId,
    sla,
    costForTwo,
  } = restData?.info;
  return (
    <div className="m-5 p-2 w-64 rounded-2xl  hover:bg-red-50 hover:shadow-md ">
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
          <p style={{ color: "#535665" }}>{costForTwo}</p>
          <p style={{ color: "#535665" }}>{sla.slaString}</p>
        </div>
      </div>
    </div>
  );
}


// Higher Order Component 
// Higher Order Component is a pure function we are not modifying anything just using it.

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    const { restData } = props;
    return (
      <div>
        <label className='absolute bg-black text-white mx-5 mt-2 p-1 rounded-md z-10'>Promoted</label>
        <RestaurantCard restData={restData} />
      </div>
    );
  }
};

export default RestaurantCard;