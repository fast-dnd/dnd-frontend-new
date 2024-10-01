import React, { useEffect, useState } from "react";

function TimerComponent({ endDate, currentEpoch }: { endDate: number; currentEpoch: number }) {
  const [timer, setTimer] = useState("");

  useEffect(() => {
    function updateTimer() {
      const endTimestamp = endDate;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      let timeDifference = endTimestamp - currentTimestamp;

      if (timeDifference < 0) {
        timeDifference = 0;
        clearInterval(intervalId);
      }

      const hours = Math.floor(timeDifference / 3600);
      const minutes = Math.floor((timeDifference % 3600) / 60);

      const formattedTimer = `${hours.toString().padStart(2, "0")}h ${minutes
        .toString()
        .padStart(2, "0")}m left   [ day : ${currentEpoch} ]`;

      setTimer(formattedTimer);
    }

    updateTimer();
    const intervalId = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, [endDate, currentEpoch]);

  return <p className="text-lg">{timer}</p>;
}

export default TimerComponent;
