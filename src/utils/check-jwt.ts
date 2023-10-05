const parseJwt = (token: string) => {
  try {
    return JSON.parse(window.atob(token.split(".")[1]));
  } catch (_e) {
    return null;
  }
};

const useCheckJWT = () => {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return false;
  }
  const jwt = parseJwt(token) as { exp: number };
  if (!jwt) {
    return false;
  }
  const now = new Date().getTime() / 1000;
  return now < jwt.exp;
};

export default useCheckJWT;
