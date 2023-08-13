import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HUNGRYHUB } from "../utils/constants";
import { getFormBody } from "../utils";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [signingUp, setSigningUp] = useState();
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
        navigate("/login");
        setSigningUp(false);
      }

      setSigningUp(false);
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] pt-5 pb-10 min-h-[100vh]">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div style={{ color: "#282C3F" }} className="text-3xl font-bold">
              Sign up
            </div>
            <div className="text-base mt-2">
              or &nbsp;
              <Link to="/login" style={{ color: "#FC8019" }}>
                login to your account
              </Link>
            </div>
          </div>
          <div>
            <img
              className="w-[100px] h-[105px]"
              src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100,h_100,c_fill/Image-login_btpq7r"
              alt="cart"
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <input
              className="p-3 outline-none border rounded"
              type="text"
              value={name}
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="p-3 outline-none border rounded my-4"
              type="email"
              value={email}
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="p-3 outline-none border rounded"
              type="password"
              value={password}
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="p-3 outline-none border rounded my-4"
              type="text"
              value={address}
              placeholder="Address"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              disabled={signingUp}
              style={{ backgroundColor: "#FC8019" }}
              className="text-white p-3 cursor-pointer"
            >
              {signingUp ? "Loading..." : "Continue"}
            </button>
            <p className="text-xs mt-2">
              <span style={{ color: "#686B78" }}>
                By clicking on Login, I accept the
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
