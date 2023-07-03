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
    <div className="res-card">
      {/* {console.log(`CDN_URL/${cloudinaryImageId}`)} */}
      <img className="res-logo" src={`${CDN_URL}/${cloudinaryImageId}`} alt="site-logo" />
      <div className="res-name">
        <div>
          <h4 style={{ fontSize: "17px", fontWeight: "500" }}>{name}</h4>
          <p style={{ marginTop: "-15px", fontSize: "13px", color: "#686b78" }}>
            {cuisines.join(", ")}
          </p>
        </div>
        <div className="rating-container">
          <p className="star-rating">{avgRating}</p>
          <p style={{ color: "#535665" }}>{deliveryTime} min</p>
          <p style={{ color: "#535665" }}>₹{costForTwo / 100} for two</p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard