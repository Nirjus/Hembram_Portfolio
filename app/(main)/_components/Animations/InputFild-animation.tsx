"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
type Props = {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  delay: number;
};

const InputFIeldAnimation = ( {children,
    width = "fit-content",
    delay,
  }: Props) => {
    const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [isInView, mainControls]);
  return (
    <motion.div
      ref={ref}
      style={{
        position: "relative",
        width: width,
        zIndex: 10,
        overflow: "hidden",
      }}
      variants={{
        hidden: { opacity: 0,   x: "-100%", },
        visible: { opacity: 1, x:0, },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{
        duration: 0.5,
        delay: 0.25 * delay,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}

export default InputFIeldAnimation