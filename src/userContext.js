import React, { createContext, useState } from "react";

// Create a Context
const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  // Create state or any other values you want to share
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  // The value provided by the context will be the state and methods
  return (
    <MyContext.Provider value={{ count, increment, decrement }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
