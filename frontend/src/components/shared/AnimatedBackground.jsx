import React from 'react';

const AnimatedBackground = ({height}) => {
  return (
    <div className={`fixed inset-0 -z-10 h-${height}  overflow-hidden bg-[#001a00]`}>
      <div className="absolute w-[30%] h-[30%] -top-10 -left-10 rounded-full opacity-50 blur-xl animate-mesh-1"></div>
      <div className="absolute w-[20%] h-[20%] -bottom-10 -right-10 rounded-full opacity-50 blur-xl animate-mesh-2"></div>
    </div>
  );
};

export default AnimatedBackground;