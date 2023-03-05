import React, { useEffect } from "react";

const Alert = ({ msg, type, showAlert, list }) => {
  useEffect(() => {
    const setTime = setTimeout(() => {
      showAlert();
    }, 1500);
    return () => clearTimeout(setTime);
  }, [list]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
