import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
} from "../Redux/features/cartSlice";
import emptycart from "../emptycart.png";


const Cart = () => {
  const [checked, setChecked] = useState();
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setChecked(e.target.checked)
  }

  if (cartItems.length === 0) {
    return (
      // Empty cart
      <div className="flex flex-col items-center justify-between">
        <div>
          <img className="w-80 h-72 my-5" src={emptycart} alt="empty-cart" />
        </div>
        <div style={{ color: "#535665" }} className="text-xl font-semibold">
          Your cart is empty
        </div>
        <div style={{ color: "#7E808C" }} className="text-sm my-2">
          You can go to home page to view more restaurants
        </div>
        <div className="my-5">
          <Link
            to="/"
            style={{ backgroundColor: "#FC8019" }}
            className="text-white p-3 font-semibold"
          >
            SEE RESTAURANTS NEAR YOU
          </Link>
        </div>
      </div>
    );
  }

  function total(){
    let sum = 0
    cartItems.forEach(
      (element) =>
        (sum =
          sum +
          (element.inStock *
            (element.card.info.price
              ? element.card.info.price
              : element.card.info.defaultPrice)) /
            100)
    );
    return sum
  }
  let totalPrice = total();
  
  return (
    <div
      style={{ backgroundColor: "#E4E7E9" }}
      className="flex flex-col-reverse md:flex-row md:justify-between py-8 px-8 -mt-3"
    >
      {/* left section - account details */}
      <div className="invisible md:visible overflow-hidden flex flex-col w-12/12 md:w-[67%]">
        <div className="bg-white p-10 mb-3">
          <div>
            <h1 style={{ color: "#282C3F" }} className="text-lg font-bold">
              Account
            </h1>
            <p style={{ color: "#7E808C" }} className="text-base">
              To place your order now, log in to your existing account or sign
              up.
            </p>
            <div className="flex flex-wrap mt-8">
              <div className="border inline-block py-2 px-11 mr-4">
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
        <div className="bg-white p-10 mb-3">
          <h1 style={{ color: "#93959F" }} className="text-lg font-bold">
            Delivery address
          </h1>
        </div>
        <div className="bg-white p-10">
          <h1 style={{ color: "#93959F" }} className="text-lg font-bold">
            Payment
          </h1>
        </div>
      </div>
      {/* Right section - order details */}
      <div className="w-12/12 md:w-[31%]">
        <div className="restaurant-details bg-white p-4 ">
          <div className="flex mb-6">
            <div className="w-14 h-14 mr-4">
              <img
                src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/Image-login_btpq7r"
                alt="restaurant"
              />
            </div>
            <div>
              <h1
                style={{ color: "#282C3F" }}
                className="text-[17px] font-bold"
              >
                Enjoy your meal
              </h1>
              <p style={{ color: "#686B78" }} className="text-[13px]">
                Order now
              </p>
            </div>
          </div>
          <div className="flex flex-col overflow-y-auto h-72 px-3">
            <div className="item-details">
              {cartItems.map((item, index) => (
                <div className="flex items-center" key={index}>
                  <div className="flex w-8">
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
                  <div className="w-5/12">
                    <h1
                      style={{ color: "#282C3F" }}
                      className="text-sm font-medium my-1 text-black"
                    >
                      {item?.card?.info?.name}
                    </h1>
                  </div>
                  <div className="flex justify-between sm:w-[70px] bg-white border shadow-2xl text-green-600 font-semibold mx-4">
                    <button
                      className="w-6"
                      onClick={() =>
                        dispatch(decreaseQuantity(item.card.info.id))
                      }
                    >
                      -
                    </button>
                    <div className="w-2">{item.inStock}</div>
                    <button
                      className="w-6"
                      onClick={() =>
                        dispatch(increaseQuantity(item.card.info.id))
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="w-2/12 text-sm">
                    ₹
                    {(item.inStock *
                      (item.card.info.price
                        ? item.card.info.price
                        : item.card.info.defaultPrice)) /
                      100}
                  </div>
                </div>
              ))}
            </div>
            <div className="my-4 mr-2">
              <input
                style={{ backgroundColor: "#F2F2F2" }}
                className="w-[100%] p-4 rounded-md outline-none"
                type="text"
                placeholder="Any suggestions? We will pass it on..."
              />
            </div>
            <div className="border flex px-3 py-1 mr-1">
              <div className="mr-3">
                <input type="checkbox" className="" onChange={handleChange} />
              </div>
              <div className="flex flex-col">
                <div
                  className="text-md font-semibold"
                  style={{ color: "#3E4152" }}
                >
                  Opt in for No-contact Delivery
                </div>
                {checked ? (
                  <div className="text-sm" style={{ color: "#282C3F" }}>
                    Our delivery partner will call to confirm. Please ensure
                    that your address has all the required details.
                  </div>
                ) : (
                  <div className="text-sm" style={{ color: "#282C3F" }}>
                    Unwell, or avoiding contact? Please select no-contact
                    delivery. Partner will safely place the order outside your
                    door (not for COD)
                  </div>
                )}
              </div>
              {/* {input.?[checked] ? (<h1>hello</h1>) : (<h1>hi</h1>)} */}
            </div>
            <div className="flex flex-col mr-2">
              <div style={{ color: "#282C3F" }} className="text-sm mt-3">
                Bill Details
              </div>
              <div
                style={{ color: "#686b78" }}
                className="flex justify-between text-sm my-3"
              >
                <div>Item Total</div>
                <div>₹{totalPrice}</div>
              </div>
              <div
                style={{ color: "#686b78" }}
                className="flex justify-between text-sm"
              >
                <div>Delivery Fee</div>
                <div>₹50</div>
              </div>
              <div className="border mt-[17px] mb-[15px]"></div>
              <div
                style={{ color: "#686b78" }}
                className="flex justify-between text-sm"
              >
                <div>GST and Restaurant Charges</div>
                <div>₹{Math.round((totalPrice * 18) / 100)}</div>
              </div>
            </div>
            <div
              style={{ borderColor: "#000000" }}
              className="border mt-7 mb-1"
            ></div>
          </div>
          <div
            style={{ color: "#282C3F" }}
            className="flex justify-between text-sm font-bold px-6 py-3"
          >
            <div>TO PAY</div>
            <div>₹{Math.round(totalPrice + 50 + (totalPrice * 18) / 100)}</div>
          </div>
        </div>
        <div className="mt-6 bg-white p-6">
          <div className="flex flex-col border p-4">
            <div
              style={{ color: "#3E4152" }}
              className="text-base font-semibold"
            >
              Review your order and address details to avoid cancellations
            </div>
            <div style={{ color: "#282C3F" }} className="text-xs my-4">
              <span style={{ color: "#EC6148" }}>Note:</span> If you cancel
              within 60 seconds of placing your order, a 100% refund will be
              issued. No refund for cancellations made after 60 seconds.
            </div>
            <div style={{ color: "#808080" }} className="text-xs">
              Avoid cancellation as it leads to food wastage.
            </div>
            <div
              style={{ color: "#EC6148" }}
              className="text-sm mt-4 border-dotted"
            >
              Read cancellation policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;