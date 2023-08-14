import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import { setUser } from "../Redux/features/userSlice";
import { getFormBody } from "../utils";
import { HUNGRYHUB } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const isUserLoggedIn = useSelector((store) => store.account.user.isLoggedIn)

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

      const data = await response.json();
      // console.log('data',data);

      if (data.success) {
        localStorage.setItem("__hungryhub_token__", data.data.token);
        const userToken = localStorage.getItem("__hungryhub_token__");
        if (userToken) {
          const userDetails = jwt(userToken);
          dispatch(setUser(userDetails));
          navigate("/offers");
          setLoggingIn(false);
        }
      }

      setLoggingIn(false);

    } catch (err) {
      console.log(err);
    }
  };

  if(isUserLoggedIn){
    navigate(-1);
  }

  return (
    <div className="flex justify-center">
      <div className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] pt-5 pb-10 min-h-[100vh]">
        <div className="flex justify-between items-center mb-4 mt-1">
          <div>
            <div style={{ color: "#282C3F" }} className="text-3xl font-bold">
              Login
            </div>
            <div className="text-base mt-2">
              or &nbsp;
              <Link to="/create" style={{ color: "#FC8019" }}>
                create an account
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
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="p-3 outline-none border rounded my-4"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={loggingIn}
              style={{ backgroundColor: "#FC8019" }}
              className="text-white p-3 text-lg font-bold"
            >
              {loggingIn ? "LOGGING IN..." : "LOG IN"}
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

export default Login;