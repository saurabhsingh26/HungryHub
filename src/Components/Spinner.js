import React from 'react'

const Spinner = () => {
  return (
    <div>
      <div className="w-[100%] h-[350px] bg-black flex flex-col justify-center items-center -mt-2">
        <div className="w-20 h-20 border-4 border-l-transparent text-white rounded-[50%] animate-spin"></div>
        <h1 className='text-white mt-9 text-2xl'>Looking for great food near you ...</h1>
      </div>
    </div>
  );
}

export default Spinner;