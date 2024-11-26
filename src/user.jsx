import React from "react";

const User = ({ isCancelButton }) => {
  const token = sessionStorage.getItem("token");
  const handleClick = () => {
    console.log("hello");
  };
  return <button onClick={handleClick}>user</button>;
};

export default User;
