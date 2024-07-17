import React, { useState } from "react";
import ItemList from "./ItemList";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const RestaurantCategory = ({ category, restaurantData, last }) => {
  const { title, itemCards } = category.card.card;

  const [showItem, setShowItem] = useState(false);

  if (!itemCards) {
    return null;
  }

  return (
    <div>
      {/* Restaurant Item Category Name and up, down arrow */}
      <div
        className="flex justify-between my-4 px-4 hover:cursor-pointer"
        onClick={() => setShowItem(!showItem)}
      >
        <span style={{ color: "#3E4152" }} className="text-lg font-bold">
          {title} ({itemCards?.length})
        </span>
        <span>{showItem ? <UpOutlined /> : <DownOutlined />}</span>
      </div>
      {/* Items inside Category Component */}
      {showItem && (
        <ItemList items={itemCards} restaurantData={restaurantData} />
      )}
      {title !== last && <div className="bg-gray-100 shadow-sm h-4"></div>}
    </div>
  );
};

export default RestaurantCategory;
