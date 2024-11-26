import React, { useState } from "react";

function Input() {
  const [inputValue, setInputValue] = useState("");

  function isAllowedInput(value) {
    let invalid = "";
    if (!/^[!@#$%&*()\-+=\\ a-zA-Z0-9]{2,20}$/.test(value)) {
      invalid = value?.replace(/[!@#$%&*()\-+=”’\\ a-zA-Z0-9]/g, "");
      invalid = [...new Set(invalid.split(""))].join("");
    }
    console.log(invalid);
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
    // }
  };

  return (
    <div>
      <label>
        Enter text:
        <input type="text" value={inputValue} onChange={handleChange} />
      </label>
      <button onClick={() => isAllowedInput(inputValue)}>validate</button>
    </div>
  );
}

export default Input;
