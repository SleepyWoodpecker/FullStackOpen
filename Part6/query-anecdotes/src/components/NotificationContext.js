// inside a reducer context function, the following has to be defined: 1. the reducer to handle the actions, 2. the context that you wish to create, 3. the eventual provider

import React, { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload;
    case "DISMISS":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();
export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationReducer = useContext(NotificationContext);
  return notificationReducer[0];
};

export const useNotificationDispatch = () => {
  const notificationReducer = useContext(NotificationContext);
  return notificationReducer[1];
};
