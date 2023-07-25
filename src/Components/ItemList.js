import React from 'react'
import { CDN_URL } from '../utils';
const ItemList = ({items}) => {
  // console.log("items", items);
  return (
    <div className="">
      {items.map((item) => (
        <div key={item.card.info.id}>
          {/* <div className="border my-5"></div> */}
          <div className="flex justify-between py-5">
            <div className="w-9/12">
              <h1 className="text-md font-medium">{item.card.info.name}</h1>
              <p className="text-sm">₹{item.card.info.price / 100}</p>
              <p className="text-sm text-gray-500 truncate">
                {item.card.info.description}
              </p>
            </div>
            <div className="relative">
              <img
                className="w-28 h-24 rounded-lg"
                src={CDN_URL + "/" + item.card.info.imageId}
                alt="item"
              />
              <div className="absolute z-10 top-20 right-3 sm:right-4">
                <button className="p-0 w-14 sm:w-20 rounded-lg bg-white border shadow-xl text-green-600 font-semibold">
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

export default ItemList