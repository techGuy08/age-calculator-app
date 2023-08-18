import React from "react";
const InputField = ({ id, placeholder, value, onChange, label }) => {
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="day">{label}</label>
        <input
          type="number"
          min={1}
          id={id}
          placeholder={placeholder}
          className="form-control"
          value={value}
          onChange={onChange}
        />
        <span>this field is required</span>
      </div>
    </React.Fragment>
  );
};
export default InputField;
