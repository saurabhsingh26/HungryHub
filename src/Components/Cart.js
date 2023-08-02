import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
} from "../Redux/features/cartSlice";
const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return <h1>Your cart is empty</h1>;
  }
  return (
    <div
      style={{ backgroundColor: "#E4E7E9" }}
      className="flex flex-col-reverse md:flex-row"
    >
      <div className="invisible md:visible overflow-hidden flex flex-col w-12/12 md:w-6/12 mx-10">
        <div className="bg-white p-10 my-8 ">
          <div>
            <h1 style={{ color: "#282C3F" }} className="text-lg">
              Account
            </h1>
            <p style={{ color: "#7E808C" }} className="text-base">
              To place your order now, log in to your existing account or sign
              up.
            </p>
            <div className="flex">
              <div className="border inline-block py-2 px-12">
                <Link to="/login">
                  <p style={{ color: "#60B246" }} className="text-[13px]">
                    Have an account?
                  </p>
                  <h1
                    style={{ color: "#60B246" }}
                    className="text-sm font-bold"
                  >
                    LOG IN
                  </h1>
                </Link>
              </div>
              <div
                style={{ backgroundColor: "#7BBB64" }}
                className="border inline-block py-2 px-12"
              >
                <Link to="/login">
                  <p style={{ color: "#ffffff" }} className="text-[13px]">
                    New to Swiggy?
                  </p>
                  <h1
                    style={{ color: "#ffffff" }}
                    className="text-sm font-bold"
                  >
                    SIGN UP
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-10 ">
          <h1 style={{ color: "#93959F" }} className="text-lg font-bold">
            Delivery address
          </h1>
        </div>
        <div className="bg-white p-10 my-8">
          <h1 style={{ color: "#93959F" }} className="text-lg font-bold">
            Payment
          </h1>
        </div>
      </div>
      <div className="w-12/12 md:w-6/12 mx-10">
        <div className="restaurant-details bg-white my-8 p-4 ">
          <div className="flex">
            <div className="w-14 h-14">
              <img
                src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/tnjwc1hltzaudqyilpzq"
                alt="restaurant"
              />
            </div>
            <div>
              <h1
                style={{ color: "#282C3F" }}
                className="text-[17px] font-bold"
              >
                La Pino's Pizza
              </h1>
              <p style={{ color: "#686B78" }} className="text-[13px]">
                Kankarbagh
              </p>
            </div>
          </div>
          <div className="item-details">
            {cartItems.map((item, index) => (
              <div className="flex justify-between items-center" key={index}>
                {console.log("item", item)}
                <div className="flex">
                  {item?.card?.info?.itemAttribute?.vegClassifier ===
                  "NONVEG" ? (
                    <div className="border border-red-600 w-3 h-3 flex justify-center items-center">
                      <div className="bg-red-600 w-2 h-2 rounded-[50%]"></div>
                    </div>
                  ) : (
                    <div className="border border-green-600 w-3 h-3 flex justify-center items-center">
                      <div className="bg-green-600 w-2 h-2 rounded-[50%]"></div>
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-md font-medium my-1 text-black">
                    {item?.card?.info?.name}
                  </h1>
                </div>
                <div className="flex justify-between sm:w-20 bg-white border shadow-2xl text-green-600 font-semibold px-2">
                  <button
                    onClick={() =>
                      dispatch(decreaseQuantity(item.card.info.id))
                    }
                  >
                    -
                  </button>
                  <h1>{item.card.info.inStock}</h1>
                  <button
                    onClick={() =>
                      dispatch(increaseQuantity(item.card.info.id))
                    }
                  >
                    +
                  </button>
                </div>
                <div>
                  ₹
                  {(item.card.info.inStock *
                    (item.card.info.price
                      ? item.card.info.price
                      : item.card.info.defaultPrice)) /
                    100}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
