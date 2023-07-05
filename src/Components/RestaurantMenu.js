import React, { useEffect, useState } from 'react'
import ShimmerContainer from './ShimmerContainer';


const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchMenu();
  },[])


  const fetchMenu = async() => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.679466959904303&lng=77.50065922737122&restaurantId=677682&submitAction=ENTER"
    );
    const json = await data.json();
    console.log("JSON", json.data);
    setResInfo(json.data);
  }

  if (resInfo === null){
    return <ShimmerContainer />;
  } 
  const { name } = resInfo?.cards[0]?.card?.card?.info
  return (
    <div>
      <h1>{name}</h1>
      <h2>Cusines</h2>
    </div>
  );
}

export default RestaurantMenu;