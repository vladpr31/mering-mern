import React from "react";
import Pulse from "../UI/Pulse";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MechanicalHearrt from "../../Assets/heart2.png";
import useWindowSize from "../../hooks/useWindowSize";
import "./Heart.css";
const Heart = () => {
  const width = useWindowSize();
  return (
    <div className="py-20 mb-10 xl:py-0 xl:mb-0 lg:py-0 lg:mb-0">
      <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:-translate-x-3/4 md:-translate-y-1/8  flex justify-center items-center h-[350px] w-[350px] rounded-full bg-white bg-opacity-10 backdrop-blur-lg backdrop-filter shadow-xl">
        <div className="w-[250px] h-[250px] shadow-xl bg-white bg-opacity-20 backdrop-blur-md backdrop-filter rounded-full "></div>
        <div className="absolute bottom-8" id="heart">
          <img
            src={MechanicalHearrt}
            alt="heart"
            className="w-[250px] h-[350px] rounded-full "
          />
        </div>
        <div
          className={`absolute bg-white bg-opacity-40 border-4 border-white backdrop-blur-3xl backdrop-filter ${
            width <= 768 ? "top-48 left-16" : "top-64 -left-6"
          } shadow-xl  flex flex-col rounded-xl`}
        >
          <div className="flex p-2 items-center rounded-xl">
            <FontAwesomeIcon
              icon={faHeartPulse}
              style={{ color: "white" }}
              size="2xl"
              className="bg-[#1866ec] p-2 rounded-xl"
            />
            <div className="flex flex-col p-2">
              <h1 className="badge badge-outline text-black badge-lg">
                Heart Rate
              </h1>
              <p className="font-medium text-[18px]">
                {Math.floor(Math.random() * (200 - 60) + 60)} bpm
              </p>
            </div>
          </div>
          {/* <Pulse /> */}
        </div>
      </div>
    </div>
  );
};

export default Heart;