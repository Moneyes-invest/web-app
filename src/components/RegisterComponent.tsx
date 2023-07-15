import { Checkbox } from "antd";
import React from "react";
import { RegisterComponentProps } from "../types";
import { InputComponent } from "./InputComponent";

export const RegisterComponent: React.FC<RegisterComponentProps> = (props) => {
  const {
    condError = "",
    onChange = () => {},
    user,
    setCondition,
    userError,
  } = props;

  return (
    <div className="row m-0">
      <div className="col-12 mb-4">
        <InputComponent
          type="email"
          error={userError.email}
          placeholder="Address mail"
          onChange={(e) => onChange({ ...user, email: e.target.value })}
        />
      </div>
      <div className="col-12 mb-4">
        <InputComponent
          type="password"
          error={userError.plainPassword}
          placeholder="Mot de passe"
          onChange={(e) => onChange({ ...user, plainPassword: e.target.value })}
        />
      </div>
      <div className="col-12 mb-4">
        <InputComponent
          error={userError.name}
          placeholder="Votre nom"
          onChange={(e) => onChange({ ...user, name: e.target.value })}
        />
      </div>
      <div className="col-12 mb-4">
        <InputComponent
          placeholder="Votre prénom"
          error={userError.lastname}
          onChange={(e) => onChange({ ...user, lastname: e.target.value })}
        />
      </div>
      <div className="col-12 mb-4">
        <InputComponent
          placeholder="date de naissance"
          type="date-input"
          maxYear={-10}
          error={userError.birthdate}
          onDateChange={(date) => onChange({ ...user, birthdate: date })}
        />
      </div>
      <div className="col-12 mb-4">
        <Checkbox onChange={(e) => setCondition(e.target.checked)}>
          <span className={condError}>
            J'accepte les{" "}
            <span className="condition">conditions d'utilisation</span>
          </span>
        </Checkbox>
      </div>
    </div>
  );
};
