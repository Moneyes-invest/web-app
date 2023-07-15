import React from "react";
import { ButtonComponentProps } from "../types";
const StyleChose = (props: ButtonComponentProps) => {
  const {
    active = true,
    activeColor = "",
    activeBg = "",
    inactiveBg = "",
    inactiveColor = "",
  } = props;
  return active
    ? {
        color: activeColor,
        backgroundColor: activeBg,
      }
    : {
        color: inactiveColor,
        backgroundColor: inactiveBg,
      };
};

export const ButtonComponent: React.FC<ButtonComponentProps> = (props) => {
  const { value, onClick = () => {} } = props;
  return (
    <div
      className="button"
      style={{ ...StyleChose(props) }}
      onClick={() => onClick()}
    >
      {value}
    </div>
  );
};
