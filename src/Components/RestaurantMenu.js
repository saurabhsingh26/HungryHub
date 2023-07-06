import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ShimmerContainer from './ShimmerContainer';
import { MENU_API } from '../utils';


const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const params = useParams();
  const { resId } = params;

  useEffect(() => {
    fetchMenu();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const fetchMenu = async() => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
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