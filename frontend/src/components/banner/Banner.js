import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../hook/GlobalHook";

export default function Banner() {
  const GlobalHook = useContext(GlobalContext);

  return (
    <div
      className="flex justify-center items-center flex-col"
      style={{
        height: "100vh",
        backgroundImage:
          "url(" +
          `https://studysabaiapp.sgp1.digitaloceanspaces.com/farmerly-farm/famerly-farm-banner.png` +
          ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="text-4xl font-bold text-white mb-6 text-center" style={{ color:'#0E6251' }}>
        Farmerly Farm - Farm to Table
      </div>
      <div
        className="text-xl font-bold text-white mb-6 md:mb-10 text-center"
        style={{ maxWidth: "500px", color:'#0E6251' }}
      >
        Get Fresh Farm Foods Delivered to your Table Today.
      </div>

      {!GlobalHook.getGlobalToken && (
        <div
          className="bg-blue-700 rounded-lg text-center text-white text-2xl font-bold px-4 flex items-center hover:bg-blue-600 cursor-pointer"
          style={{ height: "40px", backgroundColor:"#0E6251" }}
          onClick={() => {
            GlobalHook.setGlobalShowLoginModal(true);
          }}
        >
          Order Now
        </div>
      )}
    </div>
  );
}
