import { useEffect, useState } from "react";

import { slides } from "../utils/slides";

const useSlides = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return [current, setCurrent] as const;
};

export default useSlides;
