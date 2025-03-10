import React from "react";
import { CDN_URL } from "../utils";
import star from "../assets/star.png";

const RestaurantCard = (props) => {
  const { restData } = props;
  const { name, cuisines, avgRating, cloudinaryImageId, sla, costForTwo } =
    restData?.info;

  return (
    <div className="p-2 m-0 w-[326px] rounded-2xl hover:shadow">
      {/* Restaurant Image */}
      <div className="w-[310px] h-[200px]">
        <img
          className="res-logo rounded-2xl w-[100%] h-[100%] bg-cover"
          src={`${CDN_URL}/${cloudinaryImageId}`}
          alt="card"
        />
      </div>
      <div className="res-name flex justify-between">
        {/* Restaurant Name and Cuisines */}
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
        {/* Restaurant Rating, Cost and Time */}
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
};

// Higher Order Component
// Higher Order Component is a pure function we are not modifying anything just using it.

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    const { restData } = props;
    return (
      <div>
        <label
          style={{ background: "#3a3c41" }}
          className="absolute text-sm font-bold text-white mx-[20.5px] mt-2 p-1 z-10"
        >
          PROMOTED
        </label>
        <label
          style={{
            clipPath: "polygon(0 0,100% 0,100% 100%)",
            background: "#3a3c41",
          }}
          className="absolute h-2 w-2 mt-[35.8px] ml-[20.3px]"
        ></label>
        <RestaurantCard restData={restData} />
      </div>
    );
  };
};

export const withOfferLabel = (RestaurantCard) => {
  return (props) => {
    const { restData } = props;
    return (
      <div>
        <label
          style={{ backgroundColor: "#256FEF" }}
          className="absolute text-white text-sm mx-2 mt-[11rem] px-1"
        >
          {restData.info.offer}
        </label>
        <RestaurantCard restData={restData} />
      </div>
    );
  };
};

export default RestaurantCard;
