import { useParams } from 'react-router-dom';
import ShimmerContainer from './ShimmerContainer';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';
import { useState } from 'react';
import star from '../star.png'

const RestaurantMenu = () => {
  const params = useParams();
  const { resId } = params;

  const resInfo = useRestaurantMenu(resId);
  // console.log("resInfo", resInfo);

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
  // console.log("categories", categories[0]);
  if (!categories) {
    return <ShimmerContainer />;
  }

  const { name, areaName, avgRating, totalRatingsString, labels, sla } =
    resInfo?.cards[0]?.card?.card?.info;
  const { message } = labels[2];
  const { lastMileTravelString } = sla;
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[90%] md:w-[65%] lg:w-[65%] xl:w-[65%] p-3 items-between">
        <div>
          <button> BACK </button>
        </div>
        <div className="">
          <div className="flex justify-between">
            <div>
              <p className="text-base md:text-2xl font-bold">{name}</p>
              <p>{message}</p>
              <p>
                {areaName}, {lastMileTravelString}
              </p>
            </div>
            <div className="flex flex-col items-center  text-xs md:text-xl min-w-[50px] text-center ">
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
              <div className="border my-1"></div>
              <div>{totalRatingsString}</div>
            </div>
            {/* <p>
            {
              resInfo?.cards[0]?.card?.card?.info?.feeDetails?.message
            }
          </p> */}
          </div>
        </div>
        <div className="border my-3"></div>
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
}

export default RestaurantMenu;