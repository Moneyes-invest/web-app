import { Button } from "antd";
import { Auth } from "../api";
import { useNavigate } from "react-router-dom";
import { getLocalUser } from "../func";
import { localStorageKey } from "../types";
export const LogoutComponent = () => {
  const navigate = useNavigate();
  const logout = () => {
    const user = getLocalUser();
    if (user) {
      Auth.LogOut(user.token, user.refresh_token)
        .then((res) => {
          const { code } = res;
          if (code === 200) {
            localStorage.removeItem(localStorageKey);
            navigate("/");
          }
        })
        .catch((e: any) => {
          console.log("Error:", e);
        });
    } else {
      navigate("/");
    }
  };
  return (
    <Button danger onClick={() => logout()}>
      Logout
    </Button>
  );
};
