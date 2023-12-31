import React from "react";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MechanicalHearrt from "../../Assets/heart2.png";
import { motion } from "framer-motion";

const Heart = React.memo(({ isMobile }) => {
  const bpmRate = Math.floor(Math.random() * (200 - 60) + 60);
  console.log(bpmRate);
  const heartVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1.1, 1, 1.1, 1, 1.1],
    },
    transition: {
      duration: bpmRate > 100 ? 2 : 10,
      repeat: Infinity,
      repeateType: "reverse",
    },
  };

  return (
    <div className="h-fit ">
      {/*Outer Heart Circle */}
      <div className="flex justify-center items-center h-[350px] w-[350px] rounded-full bg-white bg-opacity-30 backdrop-blur-lg backdrop-filter shadow-xl">
        {/*Inner Heart Circle */}
        <div className="w-[250px] h-[250px] shadow-xl bg-white bg-opacity-10 backdrop-blur-md backdrop-filter rounded-full "></div>
        {/* Heart */}
        <motion.div
          variants={heartVariants}
          initial="initial"
          animate="animate"
          transition={heartVariants.transition}
          className="absolute bottom-8"
        >
          <img
            src={MechanicalHearrt}
            alt="heart"
            className="w-[250px] h-[350px] rounded-full "
          />
        </motion.div>
        <div
          className={`absolute bg-white bg-opacity-40 border-4 border-white backdrop-blur-3xl backdrop-filter ${
            isMobile ? "top-48 left-16" : "top-64 -left-6"
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
              <p
                className={`font-medium text-[18px] ${
                  bpmRate > 160 ? "text-red-600" : ""
                }`}
              >
                {bpmRate} bpm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Heart;
