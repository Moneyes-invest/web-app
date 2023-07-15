import React from "react";
import { LoginComponentProps } from "../types";
import { InputComponent } from "./InputComponent";

export const LoginComponent: React.FC<LoginComponentProps> = (props) => {
  const { onChange = () => {}, user, userError } = props;
  return (
    <div className="row m-0">
      <div className="col-12 mb-5">
        <InputComponent
          error={userError.username}
          type="email"
          placeholder="Address mail"
          onChange={(e) => onChange({ ...user, username: e.target.value })}
        />
      </div>
      <div className="col-12 mb-2">
        <InputComponent
          error={userError.password}
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => onChange({ ...user, password: e.target.value })}
        />
      </div>
      <div className="col-12 mb-4 d-flex justify-content-between">
        <span className="remember">Se souvenir de moi</span>
        <span className="password-lost">Mot de passe oublié ?</span>
      </div>
    </div>
  );
};
