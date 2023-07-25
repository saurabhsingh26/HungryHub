import { useParams } from 'react-router-dom';
import ShimmerContainer from './ShimmerContainer';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';
import { useState } from 'react';

const RestaurantMenu = () => {

  const params = useParams();
  const { resId } = params;

  const resInfo = useRestaurantMenu(resId);
  // console.log("resInfo", resInfo);

  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null){
    return <ShimmerContainer />;
  } 

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) || 
    resInfo?.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  if(!categories){
    return <ShimmerContainer />; 
  }

  const { name, areaName, avgRating, totalRatingsString, labels, sla } = resInfo?.cards[0]?.card?.card?.info;
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
            <div className="flex flex-col  text-xs md:text-xl min-w-[50px] text-center">
              <div>{avgRating}</div>
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
        {categories?.map((category, index) => (
          // RestaurantCategory is a controlled component by RestaurantMenu.
          <RestaurantCategory
            key={category?.card?.card.title}
            data={category?.card?.card}
            showItem={index === showIndex ? true : false}
            setShowIndex={() => setShowIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default RestaurantMenu;