import { useEffect } from "react";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";

export interface GuestData {
  guestId: string;
  guestName: string;
  createdAt: string;
}

const GUEST_KEY = "guest";

const useGuest = (): GuestData | null => {
  const jwtToken = useReadLocalStorage<string | null>("jwtToken");
  const [guestData, setGuestData] = useLocalStorage<GuestData | null>(GUEST_KEY, null);

  useEffect(() => {
    if (!jwtToken) {
      // User is not authenticated
      const now = new Date();

      if (guestData && guestData.createdAt) {
        const createdAt = new Date(guestData.createdAt);
        const timeDifference = now.getTime() - createdAt.getTime();
        const hoursDifference = timeDifference / (1000 * 3600);

        if (hoursDifference >= 24) {
          // More than 24 hours have passed; generate new guest data
          generateNewGuestData();
        }
      } else {
        // No guest data; generate new guest data
        generateNewGuestData();
      }
    } else {
      // User is authenticated
      // Optionally, remove guest data from local storage
      setGuestData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwtToken]);

  const generateNewGuestData = () => {
    const newGuestId = uuidv4();
    const newGuestName = generateGuestName();
    const now = new Date();

    const newGuestData: GuestData = {
      guestId: newGuestId,
      guestName: newGuestName,
      createdAt: now.toISOString(),
    };

    setGuestData(newGuestData);
  };

  const generateGuestName = () => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    return `guest#${randomNumber}`;
  };

  return guestData;
};

export default useGuest;
