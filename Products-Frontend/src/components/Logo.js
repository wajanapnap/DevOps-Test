// import { useState, useEffect } from "react";
const Logo = (props) => {
  return (
    <div
      className={`logo bg-whitesmoke rounded-full font-bold text-cyan-blue flex flex-shrink-0 items-center justify-center z-10
      left-20 -top-10 md:top-3 md:w-20 md:h-20 md:left-73 self-center ${props.position} ${props.w} ${props.h}`}
    >
      LOGO
    </div>
  );
};
export default Logo;
