import React from "react";
import icon_arrow from "./icon-arrow.svg";
const FormSubmit = () => {
  return (
    <React.Fragment>
      <div className="relative flex justify-end">
        <hr className="absolute top-5" />
        <button
          type="submit"
          className="flex justify-center relative rounded-full  px-3 py-1.5 leading-6 shadow-sm  "
        >
          <img src={icon_arrow} alt="" />
        </button>
      </div>
    </React.Fragment>
  );
};
export default FormSubmit;
