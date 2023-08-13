import React from "react";
import RestaurantByCity from "../utils/RestaurantByCity";
import CuisinesNearMe from "../utils/CuisinesNearMe";
import AppDetails from "../utils/AppDetails";
import { APP_LOGO } from "../utils/constants";
import { Link } from "react-router-dom";
const HomeFooter = () => {
  return (
    <div>
      <div className="border"></div>
      <div>
        <div className="px-11 pb-2 mt-12 text-2xl font-bold">
          Best Places to Eat Across Cities
        </div>
        <div className="flex flex-wrap justify-center items-center">
          {RestaurantByCity.map((city, index) => (
            <Link
              to="/"
              key={index}
              style={{ color: "#02060CBF" }}
              className="w-56 border text-center p-2 rounded-lg truncate m-2"
            >
              Best Restaurant in {city.text}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <div className="px-11 pb-2 mt-12 text-2xl font-bold">
          Best Cuisines Near Me
        </div>
        <div className="flex flex-wrap justify-center items-center">
          {CuisinesNearMe.map((cuisine, index) => (
            <Link
              to="/"
              key={index}
              style={{ color: "#02060CBF" }}
              className="w-56 border text-center p-2 rounded-lg truncate m-2"
            >
              {cuisine.text}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <div className="px-11 pb-2 mt-12 text-2xl font-bold">
          Explore Every Restaurants Near Me
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <Link
            to="/"
            style={{ color: "#02060CBF" }}
            className="w-80 border text-center p-2 rounded-lg truncate m-2"
          >
            Explore Restaurants Near Me
          </Link>
          <Link
            to="/"
            style={{ color: "#02060CBF" }}
            className="w-80 border text-center py-2 px-2 rounded-lg truncate m-2"
          >
            Explore Top Rated Restaurants Near Me
          </Link>
        </div>
      </div>
      {/* App details */}
      <div
        style={{ backgroundColor: "#EEEEF4" }}
        className="flex justify-around items-center p-3 mt-12"
      >
        <div
          style={{ color: "#02060CBF" }}
          className="text-xs lg:text-2xl font-bold"
        >
          <p> For better experience,download</p>
          <p>the Swiggy app now</p>
        </div>
        <div className="w-[100px] lg:min-w-[190px]">
          <Link to={AppDetails.card.card.androidAppLink}>
            <img
              src={APP_LOGO + AppDetails.card.card.androidAppImage}
              alt="android"
            />
          </Link>
        </div>
        <div className="w-[100px] lg:min-w-[190px]">
          <Link to={AppDetails.card.card.iosAppLink}>
            <img src={APP_LOGO + AppDetails.card.card.iosAppImage} alt="ios" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
