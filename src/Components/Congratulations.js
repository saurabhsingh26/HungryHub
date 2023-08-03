import React from 'react'
import congo from '../congo.jpg'
const Congratulations = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] px-4">
      {/* <div className="text-3xl font-bold">Congratulations!</div> */}
      <div className="w-80 h-80">
        <img src={congo} alt="" />
      </div>
      <div className="w-[100%] lg:w-[50%] break-keep">
        Congratulations! 🎉 Your order has been successfully flung into the
        delicious abyss, and our food astronauts are working hard to teleport it
        to your doorstep in the future! 🚀🍕🪐
      </div>
      <div className="w-[100%] lg:w-[50%] mt-8 pb-10">
        Thank you a million flavors for placing your order and investing your
        precious time in our app! 🍕🎉
      </div>
    </div>
  );
}

export default Congratulations