import React, { useState } from "react";
import InputField from "./InputField";
import FormSubmit from "./FormSubmit";
import "./AgeForm.css";
const AgeForm = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [timers, setTimers] = useState([]);
  const handleChangeEvent = (e) => {
    const keys = {
      day: setDay,
      month: setMonth,
      year: setYear,
    };
    const setVal = keys[e.target.id];
    if (setVal) {
      setVal(e.target.value);
    }
  };
  const handleSubmitEvent = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return false;
    }

    const birthDate = new Date(year, +month - 1, day);
    let ageDate = new Date() - birthDate;
    let years = parseInt(ageDate / 31556952000);
    ageDate -= years * 31556952000;
    let months = parseInt(ageDate / 2629800000);
    ageDate -= months * 2629800000;
    let days = parseInt(ageDate / 86400000);
    ageDate -= days * 86400000;

    timers.forEach((t) => clearInterval(t));
    setTimers([]);

    animateValue("#age-year", years);
    animateValue("#age-month", months);
    animateValue("#age-day", days);

    return false;
  };
  const animateValue = (selector, value, speed = 50) => {
    const el = document.querySelector(selector);
    value = Number(value);
    if (value > 100) {
      speed = 10;
    } else if (value > 1000) {
      speed = 1;
    }
    if (el) {
      let cVal = 0;
      let t1 = setInterval(() => {
        el.innerHTML = cVal;
        if (value <= cVal) {
          clearInterval(t1);
        }
        cVal++;
      }, speed);
      setTimers([...timers, t1]);
    }
  };
  const validateForm = () => {
    const dayEl = document.getElementById("day");
    const monthEl = document.getElementById("month");
    const yearEl = document.getElementById("year");
    let isValid = true;
    [dayEl, monthEl, yearEl].forEach((el) => {
      el.parentElement.querySelector("span").innerHTML =
        "This field is required";
    });
    const birthDate = new Date(year, +month - 1, day);
    let now = new Date();

    if (!year || year < 1 || year > now.getFullYear()) {
      yearEl.parentElement.classList.add("error");
      yearEl.focus();
      isValid = false;
      if (year < 1 || year > now.getFullYear()) {
        yearEl.parentElement.querySelector("span").innerHTML =
          "Must be a in the past";
      }
    } else {
      yearEl.parentElement.classList.remove("error");
    }
    if (!month || month < 1 || month > 12) {
      monthEl.parentElement.classList.add("error");
      monthEl.focus();
      isValid = false;
      if (month < 1 || month > 12) {
        monthEl.parentElement.querySelector("span").innerHTML =
          "Must be a valid month";
      }
    } else {
      monthEl.parentElement.classList.remove("error");
    }
    if (!day || day < 1 || day > 31) {
      dayEl.parentElement.classList.add("error");
      dayEl.focus();
      isValid = false;
      if (day < 1 || day > 31) {
        dayEl.parentElement.querySelector("span").innerHTML =
          "Must be a valid day";
      }
    } else {
      dayEl.parentElement.classList.remove("error");
    }
    if (
      (+day !== birthDate.getDate() ||
        +month !== birthDate.getMonth() + 1 ||
        +year !== birthDate.getFullYear()) &&
      isValid
    ) {
      [dayEl, monthEl, yearEl].forEach((el) => {
        el.parentElement.querySelector("span").innerHTML = "";
      });
      dayEl.parentElement.classList.add("error");
      monthEl.parentElement.classList.add("error");
      yearEl.parentElement.classList.add("error");
      dayEl.parentElement.querySelector("span").innerHTML =
        "Must be a valid date";
      document
        .querySelectorAll(".form-output .value")
        .forEach((el) => (el.innerHTML = "- -"));
      isValid = false;
    }
    return isValid;
  };
  return (
    <React.Fragment>
      <div className="AgeForm shadow">
        <div className="form-content mx-auto">
          <div className="form-header">
            <form action="#" method="Post" onSubmit={handleSubmitEvent}>
              <div className="form-row flex">
                <InputField
                  id="day"
                  placeholder="DD"
                  value={day}
                  onChange={handleChangeEvent}
                  label="Day"
                />

                <InputField
                  id="month"
                  placeholder="MM"
                  value={month}
                  onChange={handleChangeEvent}
                  label="Month"
                />

                <InputField
                  id="year"
                  placeholder="YYYY"
                  value={year}
                  onChange={handleChangeEvent}
                  label="Year"
                />
              </div>
              <FormSubmit />
            </form>
          </div>
          <div className="form-footer">
            <div className="form-output">
              <p>
                <span id="age-year" className="value">
                  - -
                </span>{" "}
                years
              </p>
              <p>
                <span id="age-month" className="value">
                  - -
                </span>{" "}
                months
              </p>
              <p>
                <span id="age-day" className="value">
                  - -
                </span>{" "}
                days
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AgeForm;
