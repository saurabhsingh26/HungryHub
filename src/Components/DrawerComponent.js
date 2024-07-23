import React, { useState } from "react";
import { Drawer } from "antd";
import { Login, SignUp } from "../pages";

const DrawerComponent = ({ open, onClose }) => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  return (
    <Drawer width={580} onClose={onClose} open={open} className="saurabh">
      {isLoginPage ? (
        <Login onClose={onClose} setIsLoginPage={setIsLoginPage} />
      ) : (
        <SignUp setIsLoginPage={setIsLoginPage} />
      )}
    </Drawer>
  );
};

export default DrawerComponent;
