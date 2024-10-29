import React, { useEffect, useState } from "react";

function TimerComponent({ endDate, currentEpoch }: { endDate: number; currentEpoch: number }) {
  const [timer, setTimer] = useState("");

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    function updateTimer() {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      let timeDifference = endDate - currentTimestamp;

      console.log("currentTimestamp:", currentTimestamp);
      console.log("endDate:", endDate);
      if (timeDifference <= 0) {
        timeDifference = 0;
        clearInterval(intervalId);
      }

      const hours = Math.floor(timeDifference / 3600);
      const minutes = Math.floor((timeDifference % 3600) / 60);

      const formattedTimer = `${hours.toString().padStart(2, "0")}h ${minutes
        .toString()
        .padStart(2, "0")}m left`;

      setTimer(formattedTimer);
    }

    updateTimer();
    intervalId = setInterval(updateTimer, 60000);

    return () => clearInterval(intervalId);
  }, [endDate]);

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="mt-4 flex items-center justify-center space-x-4">
        <span className="text-2xl">⏰</span>
        <p className="text-xl font-semibold text-white">{timer}</p>
        <p className="text-xl text-gray-400">📅 Day: {currentEpoch}</p>
      </div>
    </div>
  );
}

export default TimerComponent;
