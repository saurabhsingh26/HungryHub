import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils";
import {
  addItem,
  decreaseQuantity,
  increaseQuantity,
} from "../Redux/features/cartSlice";

const CategoryItem = ({ item }) => {
  const [isAdded, setIsAdded] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const cartItems = useSelector((store) => store.cart.items);
  // const isPresent = cartItems.findIndex(item);
  useEffect(() => {
    const isPresentAt = cartItems.findIndex(
      (el) => el.card.info.id === item.card.info.id
    );
    setIsAdded(isPresentAt >= 0);
    setQuantity(cartItems?.[isPresentAt]?.card.info.inStock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  // console.log("isPresent", isPresent);
  const dispatch = useDispatch();
  // Dispatch an action
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };
  return (
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
          <h1 className="text-md font-medium my-1">{item.card.info.name}</h1>
          <p className="text-sm">
            ₹
            {item.card.info.price
              ? item.card.info.price / 100
              : item.card.info.defaultPrice / 100}
          </p>
          <p className="text-sm text-gray-500">{item.card.info.description}</p>
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
            {isAdded && quantity ? (
              <div className="flex justify-between sm:w-20 bg-white border shadow-2xl text-green-600 font-semibold px-2">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.card.info.id))}
                >
                  -
                </button>
                <h1>{quantity}</h1>
                <button
                  onClick={() => dispatch(increaseQuantity(item.card.info.id))}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="p-0 w-20 sm:w-20 rounded-lg bg-white border shadow-2xl text-green-600 font-semibold"
                onClick={() => handleAddItem(item)}
              >
                ADD+
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="border mt-2"></div>
    </div>
  );
};

export default CategoryItem;
