import { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";


export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  
  if (context === null) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  
  return context;
};