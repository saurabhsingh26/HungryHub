import React from "react";
import CategoryItem from "./CategoryItem";

const ItemList = ({ items, restaurantData }) => {
  return (
    <div className="px-4">
      {items.map((item) => (
        <CategoryItem
          key={item.card.info.id}
          item={item}
          restaurantData={restaurantData}
        />
      ))}
    </div>
  );
};

export default ItemList;
