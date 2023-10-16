import { GoogleLogin } from "@react-oauth/google";

import useLogin from "../hooks/use-login";

const GoogleLoginButton = () => {
  const { mutate: login } = useLogin();

  return (
    <GoogleLogin
      onSuccess={(response) => login(response)}
      theme="filled_black"
      text="continue_with"
      shape="rectangular"
      size="large"
    />
  );
};

export default GoogleLoginButton;
