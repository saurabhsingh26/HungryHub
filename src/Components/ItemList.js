import React from "react";
import CategoryItem from "./CategoryItem";

const ItemList = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <CategoryItem key={item.card.info.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
