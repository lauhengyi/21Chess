import { VariablesDefaultValueAllowedRule } from "graphql";
import { useState, useRef, useEffect } from "react";
import changeTimeValue from "../../screens/functions/changeTimeValue";
import convertTimeToSeconds from "../../screens/functions/convertTimeToSeconds";

function useTime(gameDetails, options, saved) {
  let timeDetails;
  if (saved) {
    timeDetails = {
      //Create timeDetails with less time left
      ...saved.options.timeDetails,
      p1Time: saved.timeLeft.p1TimeLeft,
      p2Time: saved.timeLeft.p2TimeLeft,
    };
  } else {
    timeDetails = options.timeDetails;
  }
  const [isRunning, setRunning] = useState(0);
  const [p1TimeLeft, setP1TimeLeft] = useState(timeDetails.p1Time);
  const [p2TimeLeft, setP2TimeLeft] = useState(timeDetails.p2Time);
  const timer = useRef();
  const delayTimer = useRef();
  const [count, setCount] = useState(0);

  useEffect(() => {
    //Check whether clock exists
    if (timeDetails.isChessClock) {
      //Clear possible timers
      if (delayTimer.current) {
        clearTimeout(delayTimer.current);
      }
      if (timer.current) {
        clearInterval(timer.current);
      }
      const player = getPlayer();
      const setTimePlayer = player === 1 ? setP1TimeLeft : setP2TimeLeft;
      const setTimeOpponent = player === 1 ? setP2TimeLeft : setP1TimeLeft;
      const timeDelay =
        player === 1 ? timeDetails.p1Delay : timeDetails.p2Delay;
      const opponentIncrement =
        player === 1 ? timeDetails.p2Increment : timeDetails.p1Increment;

      //Exclude first move of each player
      //Clocks stops running after game ends
      if (count > 1 && !checkEnd()) {
        const delayInMiliseconds =
          parseInt(convertTimeToSeconds(timeDelay)) * 1000;
        //Add delay
        delayTimer.current = setTimeout(() => {
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
      } else if (checkEnd()) {
        setRunning(0);
      }
      setCount((count) => count + 1);

      return () => clearInterval(timer.current);
    }
  }, [gameDetails.currentSide]);

  //Check timeout
  let timeout = 0;
  if (parseInt(p1TimeLeft) === 0) {
    timeout = 1;
  }
  if (parseInt(p2TimeLeft) === 0) {
    timeout = 2;
  }

  const timeLeft = {
    p1TimeLeft: p1TimeLeft,
    p2TimeLeft: p2TimeLeft,
    isRunning: isRunning,
    timeout: timeout,
  };

  function restartTimer() {
    setRunning(0);
    setP1TimeLeft(timeDetails.p1Time);
    setP2TimeLeft(timeDetails.p2Time);
    setCount(1);
    clearTimeout(delayTimer.current);
    clearInterval(timer.current);
  }

  return [timeLeft, restartTimer];

  function getPlayer() {
    if (options.startingSide === gameDetails.currentSide) {
      return 1;
    } else {
      return 2;
    }
  }

  function checkEnd() {
    const { stalemated, checkmated } = gameDetails;
    if (stalemated || checkmated) {
      return true;
    }
    return false;
  }
}

export default useTime;
