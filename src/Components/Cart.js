import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "antd";
import {
  decreaseQuantity,
  increaseQuantity,
  clearCart,
} from "../Redux/features/cartSlice";
import emptycart from "../assets/emptycart.png";
import location from "../assets/location.png";
import { CDN_URL } from "../utils";
import FixedFooter from "./FixedFooter";
import DrawerComponent from "./DrawerComponent";

const Cart = () => {
  const [checked, setChecked] = useState();
  const [tick, setTick] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const cartItems = useSelector((store) => store.cart.items);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((store) => store.account.user);
  const restDetails = useSelector((store) => store.cart.restDetails);

  // console.log(restDetails);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleCouponCode = () => {
    if (couponCode === "SWIGGYWEEKENDS") {
      if (totalPrice > 199) {
        const discount = 125;
        setCouponDiscount(discount);
        toast.success(`Cool! You've saved ₹${discount}`);
      } else {
        toast.warn(
          "To apply this coupon, the total cart value should be above ₹199"
        );
      }
    } else if (couponCode === "TRYNEW") {
      if (totalPrice > 149) {
        const discount = (totalPrice * 50) / 100;
        if (discount > 100) {
          setCouponDiscount(100);
          toast.success(`Cool! You've saved ₹100`);
        } else {
          setCouponDiscount(discount);
          toast.success(`Cool! You've saved ₹${discount}`);
        }
      } else {
        toast.warn(
          "To apply this coupon, the total cart value should be above ₹149"
        );
      }
    } else if (couponCode === "PARTY") {
      if (totalPrice > 1000) {
        const discount = (totalPrice * 15) / 100;
        setCouponDiscount(discount);
        toast.success(`Cool! You've saved ₹${discount}`);
      } else {
        toast.warn(
          "To apply this coupon, the total cart value should be above ₹1000"
        );
      }
    } else {
      setCouponDiscount(0);
      toast.error("Please apply a valid coupon code");
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  if (cartItems.length === 0) {
    return (
      // Empty cart
      <>
        <div className="min-h-[100vh]">
          <div className="flex flex-col items-center justify-between mb-12">
            <div>
              <img
                className="w-80 h-72 my-5"
                src={emptycart}
                alt="empty-cart"
              />
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
        </div>
        <FixedFooter />
      </>
    );
  }

  function total() {
    let sum = 0;
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
    return sum;
  }
  let totalPrice = total();

  return (
    <>
      <div style={{ backgroundColor: "#E4E7E9" }} className="-mt-3 mb-[65px]">
        <div className="flex justify-between pt-3 pb-2 px-2 md:px-4 lg:px-8 md:pt-6 lg:pt-6">
          <div className="">
            <button
              onClick={() => navigate("/offers")}
              className="border p-2 border-red-400 rounded-md font-bold text-md bg-white"
            >
              OFFERS
            </button>
          </div>
          <div className="">
            <button
              onClick={() => dispatch(clearCart())}
              className="border p-2 border-red-400 rounded-md font-bold text-md bg-orange-500 text-white"
            >
              CLEAR CART
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:p-4 lg:p-8">
          {/* left section - account details */}
          <div className=" flex flex-col  md:w-[55%] md:h-auto lg:w-[67%] lg:h-auto">
            {userDetails.isLoggedIn ? (
              <div className="bg-white p-10 mb-3">
                <div style={{ color: "#282C3F" }} className="text-lg font-bold">
                  Logged in &nbsp; &nbsp; ✅
                </div>
                <div
                  style={{ color: "#282C3F" }}
                  className="text-lg font-medium mt-4"
                >
                  {userDetails.name}
                </div>
              </div>
            ) : (
              <div className="bg-white p-10 mb-3">
                <div>
                  <h1
                    style={{ color: "#282C3F" }}
                    className="text-lg font-bold"
                  >
                    Account
                  </h1>
                  <p style={{ color: "#7E808C" }} className="text-base">
                    To place your order now, log in to your existing account or
                    sign up.
                  </p>
                  <div className="flex flex-wrap mt-8">
                    <div className="border inline-block py-2 px-11 mx-1 my-1 hover:shadow">
                      <div onClick={showDrawer} className="cursor-pointer">
                        <p
                          style={{ color: "#60B246" }}
                          className="text-[13px] w-28"
                        >
                          Have an account?
                        </p>
                        <h1
                          style={{ color: "#60B246" }}
                          className="text-sm font-bold text-center"
                        >
                          LOG IN
                        </h1>
                      </div>
                    </div>
                    <div
                      style={{ backgroundColor: "#7BBB64" }}
                      className="border inline-block py-2 px-11 mx-1 my-1 hover:shadow"
                    >
                      <div onClick={showDrawer} className="cursor-pointer">
                        <p
                          style={{ color: "#ffffff" }}
                          className="text-[13px] w-28"
                        >
                          New to Swiggy?
                        </p>
                        <h1
                          style={{ color: "#ffffff" }}
                          className="text-sm font-bold text-center"
                        >
                          SIGN UP
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {userDetails.isLoggedIn ? (
              <div className="bg-white p-10 mb-3">
                <div style={{ color: "#282C3F" }} className="text-lg font-bold">
                  Select delivery address
                </div>
                <div
                  style={{ color: "#7E808C" }}
                  className="text-base font-medium mt-4"
                >
                  You have a saved address in this location
                </div>
                <div className="border p-8 flex items-start mt-4">
                  <div>
                    <img
                      src={location}
                      alt="location"
                      className="w-20 h-4 sm:w-20 sm:h-10 md:w-16 md:h-5 lg:w-8 lg:h-6 mt-1"
                    />
                  </div>
                  <div className="ml-5">
                    <div
                      style={{ color: "#282C3F" }}
                      className="text-base font-semibold"
                    >
                      Home
                    </div>
                    <div style={{ color: "#93959F" }} className="text-sm my-4">
                      {userDetails.address}
                    </div>
                    {tick ? (
                      <div className="flex items-center">
                        <button
                          disabled={true}
                          style={{ backgroundColor: "#60B246" }}
                          className=" text-white text-sm font-bold py-2 px-4"
                        >
                          COOL !
                        </button>
                        <span className="ml-4">✅</span>
                      </div>
                    ) : (
                      <button
                        style={{ backgroundColor: "#60B246" }}
                        className=" text-white text-sm font-bold py-2 px-4"
                        onClick={() => setTick(true)}
                      >
                        DELIVER HERE
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-10 mb-3">
                <h1 style={{ color: "#93959F" }} className="text-lg font-bold">
                  Delivery address
                </h1>
              </div>
            )}

            <div className="bg-white p-10 mb-3">
              {userDetails.isLoggedIn ? (
                <h1 style={{ color: "#93959F" }} className="text-lg font-bold">
                  Payment &nbsp; ✅
                </h1>
              ) : (
                <h1 style={{ color: "#93959F" }} className="text-lg font-bold">
                  Payment
                </h1>
              )}
            </div>
          </div>
          {/* Right section - order details */}
          <div className="w-[100%] md:w-[42%] lg:w-[31%]">
            <div className="restaurant-details bg-white p-4">
              {/* Header */}
              <div className="flex items-center mb-6">
                <div className="w-[50px] h-[50px] mr-4">
                  <img
                    className="w-[100%] h-[100%]"
                    src={`${CDN_URL}/${restDetails?.cloudinaryImageId}`}
                    alt="restaurant"
                  />
                </div>
                <div>
                  <Link
                    to={`/restaurant/${restDetails?.id}`}
                    style={{ color: "#282C3F" }}
                    className="text-[17px] font-bold"
                  >
                    {restDetails?.name}
                  </Link>
                  <p style={{ color: "#686B78" }} className="text-[13px]">
                    {restDetails?.areaName}
                  </p>
                </div>
              </div>
              {/* Items */}
              <div className="flex flex-col overflow-y-auto h-72 px-3">
                {/* Items details */}
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
                        <span>{item.inStock}</span>
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
                {/* Instructions Input */}
                <div className="my-4 mr-2">
                  <input
                    style={{ backgroundColor: "#F2F2F2" }}
                    className="w-[100%] p-4 rounded-md outline-none"
                    type="text"
                    placeholder="Any suggestions? We will pass it on..."
                  />
                </div>
                <div className="mb-4 mr-2 flex justify-between flex-wrap">
                  <input
                    className="w-[55%] p-2 rounded-lg outline-none border-[1px] border-gray-500"
                    type="text"
                    placeholder="COUPON CODE"
                    value={couponCode}
                    onChange={(e) =>
                      setCouponCode(e.target.value.toUpperCase())
                    }
                  />
                  <button
                    className="bg-[#7BBB64] p-2 font-bold text-white rounded-lg w-[40%] sm:w-[35%] md:w-[40%]"
                    onClick={handleCouponCode}
                    disabled={couponCode === ""}
                  >
                    APPLY
                  </button>
                </div>
                {/* No-Contact Delivery */}
                <div className="border flex px-3 py-1 mr-1">
                  <div className="mr-3">
                    <input
                      type="checkbox"
                      className=""
                      onChange={handleChange}
                    />
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
                        delivery. Partner will safely place the order outside
                        your door (not for COD)
                      </div>
                    )}
                  </div>
                  {/* {input.?[checked] ? (<h1>hello</h1>) : (<h1>hi</h1>)} */}
                </div>
                {/* Bill Details */}
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
                  {couponDiscount !== 0 && (
                    <div
                      style={{ color: "#686b78" }}
                      className="flex justify-between text-sm mb-3"
                    >
                      <div>
                        Coupon Discount{" "}
                        <button
                          onClick={() => {
                            setCouponDiscount(0);
                            setCouponCode("");
                          }}
                          className="bg-red-500 px-2 rounded-xl py-[2px] text-black"
                        >
                          remove
                        </button>
                      </div>
                      <div className="text-green-400">-₹{couponDiscount}</div>
                    </div>
                  )}
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
              {/* Total Pay */}
              <div
                style={{ color: "#282C3F" }}
                className="flex justify-between text-sm font-bold px-6 py-3"
              >
                <div>TO PAY</div>
                <div>
                  ₹
                  {Math.round(totalPrice + 50 + (totalPrice * 18) / 100) -
                    couponDiscount}
                </div>
              </div>
            </div>
            {/* cancellations policy */}
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
            {/* Proceed to pay */}
            <div className="flex justify-end">
              {userDetails.isLoggedIn ? (
                <>
                  {tick ? (
                    <Link
                      to="/order/success"
                      style={{ backgroundColor: "#7BBB64" }}
                      onClick={() => dispatch(clearCart())}
                      className="p-3 font-bold text-md text-white w-[100%] text-center"
                    >
                      CLICK TO ORDER
                    </Link>
                  ) : (
                    <p
                      style={{ backgroundColor: "#7BBB64" }}
                      className="p-3 text-md text-white w-[100%] text-center"
                    >
                      Please confirm address by clicking on Deliver Here
                    </p>
                  )}
                </>
              ) : (
                // <button
                //   disabled={true}
                //   style={{ backgroundColor: "#7BBB64" }}
                //   className="p-3 font-bold text-md text-white w-[100%] text-center"
                // >
                //   LOGIN TO ORDER
                // </button>
                <Button
                  disabled
                  block
                  style={{ backgroundColor: "#7BBB64" }}
                  className="font-bold text-md"
                >
                  LOGIN TO ORDER
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <DrawerComponent open={open} onClose={onClose} />
      <FixedFooter />
    </>
  );
};

export default Cart;
