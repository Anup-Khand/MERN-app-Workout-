import { AuthContext } from "../context/AuthContext";

import { useContext } from "react";

export const useWorkoutContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthcontext must be inside an Authcontextprovider");
  }

  return context;
};