"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  locale?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = React.memo(
  ({ value, locale = "en-US" }) => {
    let spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
    let display = useTransform(spring, (current) =>
      Math.round(current).toLocaleString(locale),
    );

    useEffect(() => {
      spring.set(value);
    }, [spring, value]);

    return (
      <motion.span className="font-bold text-5xl text-gray-50">
        {display}
      </motion.span>
    );
  },
);

export default function AnimatedNumberPage() {
  let [value, setValue] = useState(1000);
  let upDownValue = 500;

  const decreaseValue = () => setValue((prevValue) => prevValue - upDownValue);
  const increaseValue = () => setValue((prevValue) => prevValue + upDownValue);

  return (
    <div
      className={`flex flex-row items-center justify-center text-xl text-gray-100/20 space-x-6`}
    >
      <button aria-label="Decrease value" onClick={decreaseValue}>
        -{upDownValue}
      </button>

      <AnimatedNumber value={value} />

      <button aria-label="Increase value" onClick={increaseValue}>
        +{upDownValue}
      </button>
    </div>
  );
}
