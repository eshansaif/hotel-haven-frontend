import React, { useEffect, useState } from "react";
import FindRoomForm from "../../components/find-room-form";
import Container from "../../components/ui/container";
import Lottie from "lottie-react";
import lottieAnimation from "../../../public/images/lotti-animi-banner.json";

const Banner = () => {
  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const threshold = 100;
    setIsFixed(scrollY > threshold);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative max-h-[750px] flex-col">
      <div
        className="bg-cover bg-no-repeat bg-center max-h-[400px] md:max-h-[750px] relative"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-54587.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-[-25]"></div>

        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 relative">
            <div className="flex flex-col gap-4 justify-center mb-4 relative z-10">
              <Lottie
                className="max-h-80"
                animationData={lottieAnimation}
                loop={true}
              />
            </div>

            <div className="flex flex-col gap-4 justify-center mb-4">
              <h1 className="text-white text-2xl md:text-5xl md:ml-0 mx-auto hidden md:block">
                Discover <br /> Tranquility at
                <span className="text-primary-500 "> Hotel Haven</span>
              </h1>
              <p className="text-white lg:w-96 hidden md:block md:pe-96 lg:px-0 ">
                Welcome to Hotel Haven, where luxury meets serenity.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div
        className={`md:-mt-10 ${
          isFixed
            ? "fixed top-0 left-0 right-0 bg-white z-50 md:-mt-0 transition-all duration-500 ease-in-out"
            : ""
        }`}
      >
        <FindRoomForm />
      </div>
    </div>
  );
};

export default Banner;
