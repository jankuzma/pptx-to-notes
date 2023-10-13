"use client";
import { TypeAnimation } from "react-type-animation";

const AnimatedText = () => {
  return (
    <TypeAnimation
      sequence={[
        "Chat with any .pptx",
        1000,
        "Chat with any .pdf",
        1000,
        "Chat with any .docx",
        1000,
        "Chat with any .csv",
        1000,
      ]}
      wrapper="span"
      speed={30}
      style={{ fontSize: "1em", display: "inline-block" }}
      repeat={Infinity}
    />
  );
};

export default AnimatedText;
