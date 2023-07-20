import { useParams } from 'react-router-dom';
import ShimmerContainer from './ShimmerContainer';
import useRestaurantMenu from '../utils/useRestaurantMenu';


const RestaurantMenu = () => {

  const params = useParams();
  const { resId } = params;

  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null){
    return <ShimmerContainer />;
  } 
  const { name, areaName } = resInfo?.cards[0]?.card?.card?.info;
  const { message } = resInfo?.cards[0]?.card?.card?.info?.labels[2];
  const { lastMileTravelString } = resInfo?.cards[0]?.card?.card?.info?.sla;
  return (
    <div className="restaurant-details">
      <div>
        <button> BACK </button>
      </div>
      <div className="restaurant-name-container">
        <div className="">
          <p>{name}</p>
          <p>{message}</p>
          <p>
            {areaName}, {lastMileTravelString}
          </p>
          <p>
            {
              resInfo?.cards[0]?.card?.card?.info?.feeDetails?.message
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;