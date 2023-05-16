import React from "react";
import { MdRocketLaunch } from "react-icons/md";
import "./InputForm.css";

function InputForm({ submitHandler, item, changeHandler }) {
  return (
    <form onSubmit={submitHandler}>
      {" "}
      {/* Wrap the input and button in a form */}
      <textarea
      
        value={item}
        onChange={changeHandler}
        placeholder=" 📝 Make your star note..."
      />
      <button type="submit">
        <MdRocketLaunch
          style={{
            color: "white",
            fontSize: "1.75rem",
          }}
        />
      </button>
    </form>
  );
}

export default InputForm;
