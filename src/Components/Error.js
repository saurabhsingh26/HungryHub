import React from "react";
import { Link } from "react-router-dom";
import FixedFooter from "./FixedFooter";
const Error = () => {
  return (
    <>
      <div className="min-h-[85vh] flex flex-col items-center justify-center">
        <div className="font-bold text-3xl" style={{ color: "#3D4152" }}>
          Uh-oh!
        </div>
        <div
          className="mt-2 mb-4 text-base flex flex-col"
          style={{ color: "#686B78" }}
        >
          <span> Sorry! This should not have happened.</span>
          <span className="text-center">Please retry.</span>
        </div>

        <Link
          to="/"
          style={{ backgroundColor: "#FC8019" }}
          className="text-white p-2 text-base font-bold rounded"
        >
          HOME
        </Link>
      </div>
      <FixedFooter />
    </>
  );
};

export default Error;
