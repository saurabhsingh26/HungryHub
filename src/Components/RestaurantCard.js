import React from 'react'
import { CDN_URL } from '../utils';
import star from '../star.png'
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
          <h4
            style={{ color: "#1C1C1C" }}
            className="font-medium text-lg mt-[10px] truncate  w-36"
          >
            {name}
          </h4>
          <p style={{ color: "#696969" }} className="text-sm truncate  w-32">
            {cuisines.join(", ")}
          </p>
        </div>
        <div className="rating-container flex flex-col items-end my-3">
          {avgRating >= 4 ? (
            <p className=" bg-green-500  px-1 font-bold rounded-md text-center my-1 text-white flex justify-between items-center">
              <span className="font-sans text-xs pr-[2px]">{avgRating}</span>
              <span>
                <img className="w-2 h-2" src={star} alt="star" />
              </span>
            </p>
          ) : (
            <p className=" bg-orange-400  px-1 font-bold rounded-md text-center my-1 text-white flex justify-between items-center">
              <span className="font-sans text-xs pr-[2px]">{avgRating}</span>
              <span>
                <img className="w-2 h-2" src={star} alt="star" />
              </span>
            </p>
          )}

          <p style={{ color: "#696969" }}>{costForTwo}</p>
          <p style={{ color: "#363636" }}>{sla.slaString}</p>
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