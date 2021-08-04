import { useState, useRef, useEffect } from "react";
import changeTimeValue from "../screens/functions/changeTimeValue";
import convertTimeToSeconds from "../screens/functions/convertTimeToSeconds";

function useTime(timeDetails, gameDetails, options) {
  const [isRunning, setRunning] = useState(0);
  const [p1TimeLeft, setP1TimeLeft] = useState(timeDetails.p1Time);
  const [p2TimeLeft, setP2TimeLeft] = useState(timeDetails.p2Time);
  const timer = useRef();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const player = getPlayer();
    const setTimePlayer = player === 1 ? setP1TimeLeft : setP2TimeLeft;
    const setTimeOpponent = player === 1 ? setP2TimeLeft : setP1TimeLeft;
    const timeDelay = player === 1 ? timeDetails.p1Delay : timeDetails.p2Delay;
    const opponentIncrement =
      player === 1 ? timeDetails.p2Increment : timeDetails.p1Increment;

    //Exclude first move
    if (count > 0) {
      const delayInMiliseconds =
        parseInt(convertTimeToSeconds(timeDelay)) * 1000;
      //Add delay
      setTimeout(() => {
        //Decrement time
        timer.current = setInterval(
          () => setTimePlayer((timeLeft) => changeTimeValue(timeLeft, "-1")),
          1000
        );
      }, delayInMiliseconds);

      //Add increment
      setTimeOpponent((timeLeft) =>
        changeTimeValue(timeLeft, opponentIncrement)
      );

      //Update running clock
      setRunning(player);
    }
    setCount((count) => count + 1);

    return () => clearInterval(timer.current);
  }, [gameDetails.currentSide]);
  return {
    p1TimeLeft: p1TimeLeft,
    p2TimeLeft: p2TimeLeft,
    isRunning: isRunning,
  };

  function getPlayer() {
    if (options.startingSide === gameDetails.currentSide) {
      return 1;
    } else {
      return 2;
    }
  }
}

export default useTime;
