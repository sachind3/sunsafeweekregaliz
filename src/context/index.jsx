import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppState = ({ children }) => {
  const [docInfo, setDocInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tempInfo, setTempInfo] = useState(null);
  const tempData = [
    {
      id: 1,
      name: "template-1",
      date: 21,
    },
    {
      id: 2,
      name: "template-2",
      date: 22,
    },
    {
      id: 3,
      name: "template-3",
      date: 23,
    },
    {
      id: 4,
      name: "template-4",
      date: 24,
    },
    {
      id: 5,
      name: "template-5",
      date: 25,
    },
    {
      id: 6,
      name: "template-6",
      date: 26,
    },
    {
      id: 7,
      name: "template-7",
      date: 27,
    },
  ];

  const store = {
    docInfo,
    setDocInfo,
    isLoading,
    setIsLoading,
    tempData,
    tempInfo,
    setTempInfo,
  };
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
