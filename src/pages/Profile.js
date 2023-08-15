import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../Redux/features/userSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const userInfo = useSelector((store) => store.account.user);

  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("__hungryhub_token__");
    dispatch(removeUser());
    toast.success("Logged out successfully");
  };
  return (
    <div style={{ backgroundColor: "#37718E" }} className="min-h-[100vh]">
      <div>
        {userInfo.isLoggedIn ? (
          <div className="flex justify-between items-center -mt-2 px-5 py-16">
            <div className="flex flex-col">
              <div className="text-[32px] text-white font-bold">
                {userInfo.name}
              </div>
              <div className="text-base text-white ">
                {userInfo.email}
              </div>
            </div>
            <div>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded text-xl font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{ backgroundColor: "#37718E" }}
            className="flex justify-center -mt-2 p-5"
          >
            <div className="text-[32px] text-white font-bold">
              Welcome! Please login to see your account.
            </div>
          </div>
        )}
      </div>
      <div className="flex ml-5 bg-white p-10">
        <div
          style={{ backgroundColor: "#EDF1F7", color:'#535665' }}
          className="flex flex-col py-10 px-20 text-xl font-semibold"
        >
          <div className="py-5">Orders</div>
          <div className="py-5">Swiggy One</div>
          <div className="py-5">Favourites</div>
          <div className="py-5">Payments</div>
          <div className="py-5">Address</div>
          <div className="py-5">Settings</div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Profile;
