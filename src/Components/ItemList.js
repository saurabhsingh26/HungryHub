import React from 'react'
import { CDN_URL } from '../utils';



const ItemList = ({items}) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.card.info.id}>
          <div className="flex justify-between py-5">
            {/* Restaurant Category Item Card with color, name price and description */}
            <div className="w-6/12">
              {item?.card?.info?.itemAttribute?.vegClassifier === "NONVEG" ? (
                <div className="border border-red-600 w-3 h-3 flex justify-center items-center">
                  <div className="bg-red-600 w-2 h-2 rounded-[50%]"></div>
                </div>
              ) : (
                <div className="border border-green-600 w-3 h-3 flex justify-center items-center">
                  <div className="bg-green-600 w-2 h-2 rounded-[50%]"></div>
                </div>
              )}
              <h1 className="text-md font-medium my-1">
                {item.card.info.name}
              </h1>
              <p className="text-sm">
                ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {item.card.info.description}
              </p>
            </div>
            {/* Restaurant Category Item Card Image and "ADD" button */}
            <div className="relative">
              {item.card.info.imageId ? (
                <img
                  className="w-28 h-24 rounded-lg"
                  src={CDN_URL + "/" + item.card.info.imageId}
                  alt="item"
                />
              ) : (
                <img
                  className="w-28 h-24 rounded-lg"
                  src={CDN_URL + "/e7f40335a66b230f5eda766022dfecbd"}
                  alt="item"
                />
              )}

              <div className="absolute z-10 top-20 right-4 sm:right-4">
                <button className="p-0 w-20 sm:w-20 rounded-lg bg-white border shadow-2xl text-green-600 font-semibold">
                  ADD+
                </button>
              </div>
            </div>
          </div>
          <div className="border mt-2"></div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;