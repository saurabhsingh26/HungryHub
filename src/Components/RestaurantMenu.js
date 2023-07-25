import { useParams } from 'react-router-dom';
import ShimmerContainer from './ShimmerContainer';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';

const RestaurantMenu = () => {

  const params = useParams();
  const { resId } = params;

  const resInfo = useRestaurantMenu(resId);
  // console.log("resInfo", resInfo);

  if (resInfo === null){
    return <ShimmerContainer />;
  } 

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  // console.log("categories", categories);

  // console.log(resInfo?.cards[0]?.card?.card?.info);
  // console.log(categories);
  const { name, areaName, avgRating, totalRatingsString, labels, sla } = resInfo?.cards[0]?.card?.card?.info;
  const { message } = labels[2];
  const { lastMileTravelString } = sla;
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[65%] p-3 items-between">
        <div>
          <button> BACK </button>
        </div>
        <div className="">
          <div className="flex justify-between">
            <div>
              <p className="text-2xl font-bold">{name}</p>
              <p>{message}</p>
              <p>
                {areaName}, {lastMileTravelString}
              </p>
            </div>
            <div className="flex flex-col border">
              <div className="leading-9 flex justify-center">{avgRating}</div>
              <div className="border"></div>
              <div className="flex justify-center text-lg">
                {totalRatingsString}
              </div>
            </div>
            {/* <p>
            {
              resInfo?.cards[0]?.card?.card?.info?.feeDetails?.message
            }
          </p> */}
          </div>
        </div>
        <div className="border my-3"></div>
        {categories?.map((category, i) => (
          <RestaurantCategory
            key={category?.card?.card.title}
            data={category?.card?.card}
          />
        ))}
      </div>
    </div>
  );
}

export default RestaurantMenu;