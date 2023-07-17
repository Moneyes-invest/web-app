import React, { useEffect, useState } from "react";
import { Auth } from "../api";
import {
  ButtonComponent,
  LoginComponent,
  RegisterComponent,
} from "../components";
import { localStorageKey, logInType, logUpType } from "../types";
import { useNavigate } from "react-router-dom";
import { getLocalUser, validLogIn, validLogUp } from "../func";
const initLogUp: logUpType = {
  name: "",
  plainPassword: "",
  email: "",
  username: "",
  birthdate: "",
  lastname: "",
  roles: ["ROLE_USER"],
};
const initLogIn: logInType = {
  password: "",
  username: "",
};
const activeButton = {
  activeColor: "white",
  activeBg: "#D44097",
  // #2AB6B9",
  active: true,
  button: "login",
};
const notActiveButton = {
  inactiveColor: "#7b82a1",
  inactiveBg: "#f8f8fa",
  active: false,
  button: "logup",
};
const condition = {
  status: false,
  error: "",
};
export const LaunchScreen: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const [logup, setLogupUser] = useState<logUpType>(initLogUp);
  const [logupError, setLogupError] = useState<logUpType>(initLogUp);
  const [loginError, setLoginError] = useState<logInType>(initLogIn);
  const [loginUser, setLoginUser] = useState<logInType>(initLogIn);
  const [conditions, setConditions] = useState(condition);
  const [active, setActive] = useState<"load" | "login" | "logup">("login");
  const [logupB, setLogupB] = useState<any>(notActiveButton);
  const [loginB, setLoginB] = useState<any>(activeButton);
  const [severError, setServer] = useState("");
  const Register = () => {
    if (!conditions.status) setConditions({ ...conditions, error: "error" });

    const { valid, data } = validLogUp(logup, logupError);
    setLogupError(data);
    if (conditions.status && valid) {
      Auth.LogUp({ ...logup, username: logup.email })
        .then(() => setActive("login"))
        .catch((err) => {
          setServer(err.message);
          console.log("err", err);
        });
    }
  };
  const Login = () => {
    const { valid, data } = validLogIn(loginUser, loginError);
    setLoginError(data);
    if (valid)
      Auth.Login(loginUser)
        .then((res: any) => {
          if (res.token) {
            localStorage.setItem(localStorageKey, JSON.stringify(res));
            navigate("home");
          }
        })
        .catch((e: any) => {
          console.log("Error:", e);
          setLoginError({ username: "error", password: "error" });
        });
  };

  const onLogin = () => {
    if (loginB.active) {
      Login();
    } else {
      setActive("login");
      setLogupB(notActiveButton);
      setLoginB(activeButton);
    }
  };
  const onLogup = () => {
    if (logupB.active) {
      Register();
    } else {
      setActive("logup");
      setLoginB(notActiveButton);
      setLogupB(activeButton);
    }
  };
  useEffect(() => {
    const user = getLocalUser();
    if (user) {
      Auth.RefreshUser(user.refresh_token)
        .then((res) => {
          if (res.token) {
            localStorage.setItem(localStorageKey, JSON.stringify(res));
            navigate("home");
          }
        })
        .catch((e: any) => {
          setActive("login");
          console.log("Error:", e);
        });
    } else {
      setActive("login");
    }
  }, [navigate]);

  // end hooks

  // render
  return (
    <div className="container h-100 d-flex align-items-center justify-content-between">
      <div
        className={
          active === "load"
            ? "w-100 d-flex justify-content-center"
            : "phone-hide"
        }
      >
        <div> logo /texte /slog </div>
      </div>
      {active !== "load" && (
        <div className="auth-block shadow-lg px-sm-1 px-md-3 py-2 bg-white rounded">
          <div className="py-4 d-flex flex-column align-items-center">
            <h2 className="auth-title m-0"> Bienvenue sur Moneyes</h2>
            <span className="auth-sub-title">
              Connectez-vous pour accéder à votre compte
            </span>
            {severError && <span className="error">{severError}</span>}
          </div>
          {active === "login" && (
            <LoginComponent
              onChange={setLoginUser}
              user={loginUser}
              userError={loginError}
            />
          )}
          {active === "logup" && (
            <RegisterComponent
              user={logup}
              onChange={setLogupUser}
              setCondition={(c) => setConditions({ status: c, error: "" })}
              userError={logupError}
              condError={conditions.error}
            />
          )}
          <div className="row m-0 pb-4">
            <div className="col-6">
              <ButtonComponent
                value="Se connecter"
                onClick={onLogin}
                {...loginB}
              />
            </div>
            <div className="col-6">
              <ButtonComponent
                value="S'inscrire"
                onClick={onLogup}
                {...logupB}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
