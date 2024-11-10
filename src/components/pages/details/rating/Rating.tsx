// @ts-nocheck
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import scss from "./Rating.module.scss";

const Rating = ({ rating }) => {
  return (
    <div className={scss.circleRating}>
      <CircularProgressbar
        className={scss.rating}
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor: rating < 5 ? "red" : rating < 7 ? "orange" : "green",
        })}
      />
    </div>
  );
};

export default Rating;
