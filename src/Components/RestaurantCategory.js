import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const RestaurantCategory = ({ category, restaurantData, last, vegStatus }) => {
  const { title, itemCards } = category.card.card;

  const [showItem, setShowItem] = useState(false);
  const [itemRender, setItemRender] = useState([]);

  useEffect(() => {
    if (vegStatus === "VEG") {
      const veg = itemCards.filter(
        (item) => item?.card?.info?.itemAttribute?.vegClassifier === "VEG"
      );
      setItemRender(veg);
    } else if (vegStatus === "NONVEG") {
      const nonveg = itemCards.filter(
        (item) => item?.card?.info?.itemAttribute?.vegClassifier === "NONVEG"
      );
      setItemRender(nonveg);
    } else {
      setItemRender(itemCards);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vegStatus]);

  if (!itemCards) {
    return null;
  }

  return (
    <div>
      {/* Restaurant Item Category Name and up, down arrow */}
      {itemRender?.length !== 0 && (
        <div
          className="flex justify-between my-4 px-4 hover:cursor-pointer"
          onClick={() => setShowItem(!showItem)}
        >
          <span style={{ color: "#3E4152" }} className="text-lg font-bold">
            {title} ({itemRender?.length})
          </span>
          <span>{showItem ? <UpOutlined /> : <DownOutlined />}</span>
        </div>
      )}

      {/* Items inside Category Component */}
      {showItem && (
        <ItemList
          items={itemRender}
          restaurantData={restaurantData}
          vegStatus={vegStatus}
        />
      )}
      {title !== last && itemRender?.length !== 0 && (
        <div className="bg-gray-100 shadow-sm h-4"></div>
      )}
    </div>
  );
};

export default RestaurantCategory;
