import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils";
import {
  addItem,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  setCurrentRest,
} from "../Redux/features/cartSlice";
import { Modal } from "antd";

const CategoryItem = ({ item, restaurantData }) => {
  const [isAdded, setIsAdded] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const cartItems = useSelector((store) => store.cart.items);
  const restDetails = useSelector((store) => store.cart.restDetails);
  const newRestInfo = restaurantData[0]?.card?.card?.info;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restChange, setRestChange] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const isPresentAt = cartItems.findIndex(
      (el) => el.card.info.id === item.card.info.id
    );
    setIsAdded(isPresentAt >= 0);
    setQuantity(cartItems?.[isPresentAt]?.inStock);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const dispatch = useDispatch();
  // Dispatch an action
  const handleAddItem = (item) => {
    if (restDetails === null) {
      dispatch(setCurrentRest(newRestInfo));
      dispatch(addItem({ ...item, inStock: 1 }));
    } else {
      if (restDetails?.id === newRestInfo?.id) {
        dispatch(addItem({ ...item, inStock: 1 }));
      } else {
        showModal();
        if (!isModalOpen && restChange) {
          // dispatch(clearCart());
          // dispatch(addItem({ ...item, inStock: 1 }));
          // dispatch(setCurrentRest(newRestInfo));
        }
      }
    }
  };
  return (
    <div key={item.card.info.id}>
      <div className="flex justify-between py-5">
        {/* Restaurant Category Item Card with color, name price and description */}
        <div className="w-6/12">
          {item?.card?.info?.itemAttribute?.vegClassifier === "NONVEG" ? (
            <div className="border-2 border-red-600 w-4 h-4 flex justify-center items-center rounded">
              <div className="bg-red-600 w-2 h-2 rounded-[50%]"></div>
            </div>
          ) : (
            <div className="border-2 border-green-600 w-4 h-4 flex justify-center items-center rounded">
              <div className="bg-green-600 w-2 h-2 rounded-[50%]"></div>
            </div>
          )}
          <h1 className="text-[18px] my-1 text-[#02060CBF] font-bold">
            {item.card.info.name}
          </h1>
          <p className="text-base text-[#02060CEB] font-bold">
            ₹
            {item.card.info.price
              ? item.card.info.price / 100
              : item.card.info.defaultPrice / 100}
          </p>
          <p className="text-base text-[#02060C99] mt-3">
            {item.card.info.description}
          </p>
        </div>
        {/* Restaurant Category Item Card Image and "ADD" button */}
        <div className="relative">
          {item.card.info.imageId ? (
            <img
              className="w-[156px] h-36 rounded-lg"
              src={CDN_URL + "/" + item.card.info.imageId}
              alt="item"
            />
          ) : (
            // <img
            //   className="w-28 h-24 rounded-lg"
            //   src={CDN_URL + "/e7f40335a66b230f5eda766022dfecbd"}
            //   alt="item"
            // />
            <div className="w-[156px] h-36 rounded-lg border-[1px] border-gray-300 flex justify-center items-center bg-slate-100 font-bold">
              No Image
            </div>
          )}

          <div className="absolute z-10 top-[122px] right-4 sm:right-4">
            {isAdded && quantity ? (
              <div className="flex justify-between items-center rounded-lg h-[38px] w-[120px] bg-white border shadow-2xl text-green-600 font-extrabold">
                <button
                  className="w-[38px] h-[38px]"
                  onClick={() => dispatch(decreaseQuantity(item.card.info.id))}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="w-[38px] h-[38px]"
                  onClick={() => dispatch(increaseQuantity(item.card.info.id))}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="p-0 h-[39px] w-[120px] rounded-lg bg-white border shadow-2xl text-green-600 font-extrabold"
                onClick={() => handleAddItem(item)}
              >
                ADD+
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="border mt-2"></div>

      <Modal
        className="modal"
        width={520}
        footer={[]}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <div className="pb-[25px]">
            <p className="text-[#282C3F] font-bold text-xl pb-1">
              Items already in cart
            </p>
            <p className="text-[#535665] text-base">
              Your cart contains items from other restaurant. Would you like to
              reset your cart for adding items from this restaurant?
            </p>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => {
                setRestChange(false);
                setIsModalOpen(false);
              }}
              className="w-[220px] h-[50px] text-[#60B246] font-bold border-2 border-[#60B246]"
            >
              NO
            </button>
            <button
              onClick={() => {
                setRestChange(true);
                setIsModalOpen(false);
                dispatch(clearCart());
                dispatch(addItem({ ...item, inStock: 1 }));
                dispatch(setCurrentRest(newRestInfo));
              }}
              className="w-[220px] h-[50px] text-white font-bold bg-[#60B246]"
            >
              YES, START AFRESH
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryItem;
