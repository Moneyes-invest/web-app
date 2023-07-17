import { DatePicker } from "antd";
import React, { useState } from "react";
import "../assets/css/input.css";
import { InputComponentProps } from "../types";
import type { Dayjs } from "dayjs";

// Use moment.js to get the current date and time

// Custom disabledDate function
type date = { d?: number; m?: number; y?: number };
export const InputComponent: React.FC<InputComponentProps> = (props) => {
  const {
    error = "",
    placeholder,
    type,
    maxYear = 0,
    onDateChange = () => {},
  } = props;
  const [max_year] = useState(new Date().getFullYear() + maxYear);
  function disabledDate(current: Dayjs) {
    return current && current.year() > max_year;
  }
  const [fullDate, setFullDate] = useState<date>();
  const dateChange = (date: date) => {
    setFullDate(date);
    const { d, m, y } = date;
    if (d && m && y) {
      onDateChange(`${y}-${m > 9 ? m : "0" + m}-${d}`);
    }
  };
  return (
    <>
      {type === "date-input" ? (
        <div className="row m-0 d-flex justify-content-between">
          <div className="input-container col-3 small">
            <label htmlFor="" className={error + " label"}>
              Jour
            </label>
            <DatePicker
              picker="date"
              format="DD"
              placeholder=""
              onChange={(_d) =>
                dateChange({ ...fullDate, d: _d?.daysInMonth() })
              }
            />
          </div>
          <div className="input-container col-3 small">
            <label htmlFor="" className={error + " label"}>
              Mois
            </label>
            <DatePicker
              picker="month"
              placeholder=""
              format="MM"
              onChange={(_m) =>
                dateChange({ ...fullDate, m: _m ? _m.month() + 1 : undefined })
              }
            />
          </div>
          <div className="input-container col-3 small">
            <label htmlFor="" className={error + " label"}>
              Année
            </label>
            <DatePicker
              picker="year"
              placeholder=""
              disabledDate={disabledDate}
              onChange={(_y) => dateChange({ ...fullDate, y: _y?.year() })}
            />
          </div>
        </div>
      ) : (
        <div className="input-container">
          <label htmlFor="" className={error + " label"}>
            {placeholder}
          </label>
          <input {...props} placeholder=""></input>
        </div>
      )}
    </>
  );
};
