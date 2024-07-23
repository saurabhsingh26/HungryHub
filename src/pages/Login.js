import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import { toast } from "react-toastify";
import { setUser } from "../Redux/features/userSlice";
import { getFormBody } from "../utils";
import { HUNGRYHUB } from "../utils/constants";
import { Button, Input } from "antd";

const Login = ({ setIsLoginPage, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [show, setShow] = useState(false);

  // const isUserLoggedIn = useSelector((store) => store.account.user.isLoggedIn);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    const bodyString = getFormBody({
      email: email,
      password: password,
    });

    try {
      const response = await fetch(`${HUNGRYHUB}/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyString,
      });
      // console.log(response)

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("__hungryhub_token__", data.data.token);
        const userToken = localStorage.getItem("__hungryhub_token__");
        if (userToken) {
          setEmail("");
          setPassword("");
          onClose();
          const userDetails = jwt(userToken);
          dispatch(setUser(userDetails));
          setLoggingIn(false);
          toast.success("Sign in successfully");
          navigate("/cart");
        }
      } else {
        toast.warn(data.message);
        setLoggingIn(false);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  // if (isUserLoggedIn) {
  //   navigate("/cart");
  // }

  return (
    <div className="flex justify-center">
      {/* <div className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] pt-5 pb-10 min-h-[100vh]"> */}
      <div className="w-[90%] md:w-[70%]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div style={{ color: "#282C3F" }} className="text-3xl font-bold">
              Login
            </div>
            <div className="text-base mt-2">
              or &nbsp;
              <span
                className="text-[#FC8019] cursor-pointer"
                onClick={() => setIsLoginPage(false)}
              >
                create an account
              </span>
            </div>
          </div>
          <div>
            <img
              className="w-[100px] h-[105px]"
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/Image-login_btpq7r"
              alt="cart"
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <Input
              type="email"
              value={email}
              placeholder="Email"
              required
              size="large"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input.Password
              placeholder="Password"
              visibilityToggle={{
                visible: show,
                onVisibleChange: setShow,
              }}
              size="large"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {loggingIn ? (
              <Button
                loading
                disabled={true}
                size="large"
                style={{ backgroundColor: "#FC8019", color: "#ffffff" }}
                className="font-bold"
              >
                Please wait...
              </Button>
            ) : (
              <button
                style={{ backgroundColor: "#FC8019" }}
                className="text-white p-2 font-bold rounded-lg"
              >
                LOG IN
              </button>
            )}

            <p className="text-xs mt-2">
              <span style={{ color: "#686B78" }}>
                By clicking on Login, I accept the &nbsp;
              </span>
              Terms & Conditions & Privacy Policy
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
