import React, { createContext, useState, useEffect } from "react";

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [isLoggedin, setisLoggedin] = useState(() =>
    localStorage.getItem("isLoggedin")
      ? JSON.parse(localStorage.getItem("isLoggedin"))
      : false
  );
  const [user, setuser] = useState(() =>
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );

  useEffect(() => {
    localStorage.setItem("isLoggedin", JSON.stringify(isLoggedin));
  }, [isLoggedin]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserDataContext.Provider
      value={{
        isLoggedin,
        setisLoggedin,
        user,
        setuser,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
