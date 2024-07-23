import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HUNGRYHUB } from "../utils/constants";
import { getFormBody } from "../utils";
import { Button, Input } from "antd";

const SignUp = ({ setIsLoginPage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [signingUp, setSigningUp] = useState(false);
  const [show, setShow] = useState(false);

  const isUserLoggedIn = useSelector((store) => store.account.user.isLoggedIn);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);
    const bodyString = getFormBody({
      name: name,
      email: email,
      password: password,
      address: address,
    });

    try {
      const response = await fetch(`${HUNGRYHUB}/api/v1/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: bodyString,
      });

      const data = await response.json();

      if (data.success) {
        setIsLoginPage(true);
        toast.success(data.message);
        setSigningUp(false);
      } else {
        toast.warn(data.message);
        setSigningUp(false);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  if (isUserLoggedIn) {
    navigate(-1);
  }

  return (
    <div className="flex justify-center">
      {/* <div className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] pt-5 pb-10 min-h-[100vh]"> */}
      <div className="w-[70%]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div style={{ color: "#282C3F" }} className="text-3xl font-bold">
              Sign up
            </div>
            <div className="text-base mt-2">
              or &nbsp;
              <span
                className="text-[#FC8019] cursor-pointer"
                onClick={() => setIsLoginPage(true)}
              >
                login to your account
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
              type="text"
              value={name}
              placeholder="Name"
              size="large"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              value={email}
              placeholder="Email"
              size="large"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input.Password
              placeholder="Password"
              visibilityToggle={{
                visible: show,
                onVisibleChange: setShow,
              }}
              size="large"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input.TextArea
              type="text"
              value={address}
              placeholder="Address"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            {signingUp ? (
              <Button
                loading
                disabled={true}
                size="large"
                style={{ backgroundColor: "#FC8019", color: "#ffffff" }}
                className="text-lg font-bold"
              >
                Please wait...
              </Button>
            ) : (
              <button
                style={{ backgroundColor: "#FC8019" }}
                className="text-white p-2 font-bold rounded-lg"
              >
                SIGN UP
              </button>
            )}
            <p className="text-xs mt-2">
              <span style={{ color: "#686B78" }}>
                By clicking on Sign Up, I accept the &nbsp;
              </span>
              Terms & Conditions & Privacy Policy
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
