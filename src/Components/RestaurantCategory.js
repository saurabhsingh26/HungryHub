import React from 'react'
import ItemList from './ItemList';
const RestaurantCategory = ({ category, showItem, setShowIndex }) => {
  // console.log(data);
  // const [showItem, setShowItems] = useState(false);
  const { title, itemCards } = category.card.card;

  const handleClick = () => {
    setShowIndex();
  };

  if (!itemCards) {
    return null;
  }

  return (
    <div>
      <div
        className="flex justify-between my-4 p-3 hover:cursor-pointer"
        onClick={handleClick}
      >
        <span className="text-lg font-bold">
          {title} ({itemCards?.length})
        </span>
        <span>{showItem ? "⬆️" : "⬇️"}</span>
      </div>
      {showItem && <ItemList items={itemCards} />}
      <div className="bg-gray-100 shadow-sm h-5"></div>
    </div>
  );
};

export default RestaurantCategory;