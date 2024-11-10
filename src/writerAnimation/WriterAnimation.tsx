import { FC } from "react";
import { Typewriter } from "react-simple-typewriter";

export const WriterAnimation: FC = () => {
  const welcomeStr: string[] = [
    "Welcome to MovieMosaic - Enjoy the Show!",
    "Discover Movie Magic at MovieMosaic",
    "Get Ready for Cinematic Bliss",
  ];

  return (
    <>
      <Typewriter
        words={welcomeStr}
        loop={true}
        cursor={true}
        cursorStyle="|"
        typeSpeed={80}
        deleteSpeed={10}
        delaySpeed={2700}
      />
    </>
  );
};
