import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ShimmerContainer from "./ShimmerContainer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import PromoCodes from "../utils/PromoCode";
import star from "../assets/star.png";
import clock from "../assets/clock.png";
import rupee from "../assets/rupee.png";

const RestaurantMenu = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { resId } = params; //extracting restaurant id from urls

  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) {
    return <ShimmerContainer />;
  }

  // Old way to fetch categories
  // const categories =
  //   resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
  //     (c) =>
  //       c?.card?.card?.["@type"] ===
  //       "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  //   ) ||
  //   resInfo?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
  //     (c) =>
  //       c?.card?.card?.["@type"] ===
  //       "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  //   );

  // New way to fetch categories (testing)
  const categories = resInfo.cards
    ?.filter((y) => y?.groupedCard)
    ?.map((z) => {
      return z?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
        (a) =>
          a?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
    });

  if (!categories) {
    return window.location.reload();
  }

  const {
    name,
    areaName,
    avgRating,
    totalRatingsString,
    labels,
    sla,
    costForTwoMessage,
  } = resInfo?.cards[0]?.card?.card?.info;
  const { message } = labels[2];
  const { lastMileTravelString } = sla;

  return (
    <div className="flex justify-center">
      {/* Restaurant all details for a particular restaurant id */}
      <div className="flex flex-col w-[90%] md:w-[65%] lg:w-[65%] xl:w-[65%] p-3 items-between">
        <div className="mt-2 mb-6">
          <Link
            onClick={() => navigate(-1)}
            className="border p-2 border-red-400 rounded-md font-bold text-md"
          >
            BACK
          </Link>
        </div>
        {/* Restaurants Details and rating card */}
        <div>
          <div className="flex justify-between">
            {/* Restaurants Name, Cuisines and Area Name */}
            <div>
              <p
                style={{ color: "#282C3F" }}
                className="text-xl font-bold w-11/12"
              >
                {name}
              </p>
              <p style={{ color: "#7E808C" }} className="text-[13px]">
                {message}
              </p>
              <p style={{ color: "#7E808C" }} className="text-[13px]">
                {areaName}, {lastMileTravelString}
              </p>
            </div>
            {/* Restaurants Rating Container */}
            <div className="flex flex-col items-center border justify-center text-xs min-w-[70px] text-center rounded-md h-[70px] shadow-md ">
              <div>
                {avgRating >= 4 ? (
                  <p className=" bg-green-500 px-1 font-bold rounded-md text-center my-1 text-white flex justify-between items-center">
                    <span className="font-sans text-xs pr-[2px]">
                      {avgRating}
                    </span>
                    <span>
                      <img className="w-2 h-2" src={star} alt="star" />
                    </span>
                  </p>
                ) : (
                  <p className=" bg-orange-400  px-1 font-bold rounded-md text-center my-1 text-white flex justify-between items-center">
                    <span className="font-sans text-xs pr-[2px]">
                      {avgRating}
                    </span>
                    <span>
                      <img className="w-2 h-2" src={star} alt="star" />
                    </span>
                  </p>
                )}
              </div>
              <div className="border my-2 w-12"></div>
              <div
                style={{ color: "#8B8D97" }}
                className="text-[11px] font-semibold tracking-tighter"
              >
                {totalRatingsString}
              </div>
            </div>
          </div>
        </div>
        <div className="border my-3"></div>
        <div className="mb-10">
          {/* Restaurant Delivery Time and Cost for Two */}
          <div
            style={{ color: "#3E4152" }}
            className="flex my-5 text-[15px] font-bold"
          >
            <p className="mr-7 flex items-center">
              <span>
                <img className="w-4 h-4 mr-2" src={clock} alt="clock" />
              </span>
              <span>30-45 MINS</span>
            </p>
            <p className="mr-7 flex items-center">
              <span>
                <img src={rupee} alt="rupee" className="w-4 h-4 mr-2" />
              </span>
              <span>{costForTwoMessage}</span>
            </p>
          </div>
          {/* Promo Code Section */}
          <div className="flex overflow-x-auto">
            {PromoCodes.map((offer, index) => (
              <div
                className="border min-w-[15rem] h-16 rounded-lg mr-4 text-center flex justify-center items-center"
                key={index}
              >
                <div>
                  <h1
                    style={{ color: "#686B78" }}
                    className="text-sm font-bold"
                  >
                    {offer.info.header}
                  </h1>
                  <p
                    style={{ color: "#93959F" }}
                    className="text-xs font-semibold"
                  >
                    {offer.info.couponCode} | {offer.info.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Categories Card */}
        {categories[0]?.map((category, index) => (
          // RestaurantCategory is a controlled component by RestaurantMenu.
          <RestaurantCategory
            key={category?.card?.card.title}
            category={category}
            showItem={index === showIndex ? true : false}
            setShowIndex={() => setShowIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
