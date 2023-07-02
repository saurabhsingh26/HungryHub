import React from 'react'

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
      <img
        className="res-logo"
        src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${cloudinaryImageId}`}
        alt=""
      />
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