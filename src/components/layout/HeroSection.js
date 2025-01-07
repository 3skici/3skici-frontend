import React, { useState, useEffect } from "react";
import heroImage1 from "../../assets/images/hero.jpg";
import heroImage2 from "../../assets/images/hero2.jpg";
import heroImage3 from "../../assets/images/hero3.jpg";
import heroImage4 from "../../assets/images/hero1.jpg";
import HeroSearch from "./HeroSearch";

const HeroSection = () => {
  const images = [heroImage2, heroImage1, heroImage3, heroImage4]; // Ensure all images are in the array
  const intervalTime = 2500; // Time in milliseconds for background change

  const [currentImage, setCurrentImage] = useState(images[0]); // Set initial image

  useEffect(() => {
    let currentIndex = 0;

    const changeBackground = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      setCurrentImage(images[currentIndex]);
    }, intervalTime);

    return () => clearInterval(changeBackground); // Cleanup interval on component unmount
  }, []); // Removed images dependency to prevent unnecessary re-renders

  return (
    <div
      className="relative flex items-center justify-center h-[540px] bg-cover bg-center transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${currentImage})`,
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="inset-0 flex flex-col items-center justify-center bg-black bg-opacity-20 text-white text-center p-24 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">Welcome to Eskici</h1>
          <h2 className="text-2xl font-medium mb-6">Second-Hand Marketplace</h2>
          <div className="pt-4">
            <HeroSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
