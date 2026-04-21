import React from 'react';

const ComparisonSlider = ({ itemOne, itemTwo }) => {
  return (
    <div className="flex w-full h-[500px] bg-black rounded-xl overflow-hidden border border-white/10">
      {/* Left Side: Original */}
      <div className="flex-1 relative bg-[#111] border-r border-white/20">
        <img
          src={itemOne}
          className="w-full h-full object-contain"
          alt="Original"
        />
        <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-md text-[10px] font-bold tracking-widest text-white/50 uppercase">
          Original
        </div>
      </div>

      {/* Right Side: Enhanced */}
      <div className="flex-1 relative bg-[#050505]">
        {itemTwo ? (
          <img
            src={itemTwo}
            className="w-full h-full object-contain"
            alt="Enhanced"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20">
            Processing...
          </div>
        )}
        <div className="absolute top-4 left-4 bg-blue-600 px-3 py-1 rounded-md text-[10px] font-bold tracking-widest text-white uppercase shadow-lg shadow-blue-500/20">
          AI Enhanced
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;