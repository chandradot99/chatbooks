import React from "react";

import { makeStyles } from '@mui/styles';
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  loadingDots: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
    justifyContent: "center"
  },
  "@keyframes pop": {
    from: {
      transform: "scale(.5)",
      backgroundColor: "#c3cad4"
    },
    to: {
      transform: "scale(1)",
      backgroundColor: "#262b3a"
    }
  },
  circleAnimation: {
    animationDelay: "0s",
    animationDirection: "alternate",
    animationDuration: ".75s",
    animationIterationCount: "infinite",
    animationName: "$pop",
    animationTimingFunction: "linear",
    borderRadius: 9999,
    height: 8,
    width: 8,
    backfaceVisibility: "hidden"
  },
  circle2: {
    animationDelay: ".375s"
  },
  circle3: {
    animationDelay: "0.75s"
  }
}));

const LoadingDots = () => {
  const classes = useStyles();

  return (
    <div className={classes.loadingDots}>
      <div className={classes.circleAnimation} />
      <div
        className={clsx(classes.circleAnimation, classes.circle2)}
      />
      <div
        className={clsx(classes.circleAnimation, classes.circle3)}
      />
    </div>
  );
};

export default LoadingDots;