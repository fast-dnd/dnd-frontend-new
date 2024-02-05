export const logout = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("communityId");
  localStorage.removeItem("accountId");
  localStorage.removeItem("user-store");
  localStorage.removeItem("walletName");
  window.location.href = "/login";
};
