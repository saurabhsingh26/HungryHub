import React, { useState } from 'react'
import ItemList from './ItemList';
const RestaurantCategory = ({data}) => {
  const [showItem, setShowItems] = useState(false);
  const handleClick = () => {
    setShowItems(!showItem);
  }
  return (
    <div>
      <div className="flex justify-between my-4 p-3 hover:cursor-pointer" onClick={handleClick}>
        <span className='text-lg font-bold'>{data.title} ({data.itemCards.length})</span>
        <span>⬇️</span>
      </div>
      {showItem && <ItemList items={data?.itemCards} />}
      <div className="bg-gray-100 shadow-sm h-5" ></div>
    </div>
  );
}

export default RestaurantCategory