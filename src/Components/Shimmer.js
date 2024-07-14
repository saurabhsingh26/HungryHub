import React from "react";
const Shimmer = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {new Array(12).fill(0).map((card, index) => (
        <div
          key={index}
          className="m-5 p-2 w-64 rounded-2xl shadow-md animate-pulse"
        >
          <div style={style.color} className="h-52 rounded-xl"></div>
          <div>
            <div
              style={style.color}
              className="w-40 h-[14px] mb-2 rounded-xl mt-4"
            ></div>
            <div
              style={style.color}
              className="w-32 h-[14px] rounded-lg mb-8"
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const style = {
  color: {
    // backgroundColor: "#F2F2F2",
    backgroundColor: "#d9d9d9",
  },
};

export default Shimmer;
