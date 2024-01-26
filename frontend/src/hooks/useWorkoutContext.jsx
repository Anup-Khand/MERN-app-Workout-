import { workoutContext } from "../context/workoutContext";

import { useContext } from "react";

export const useWorkoutContext = () => {
  const context = useContext(workoutContext);

  if (!context) {
    throw Error("useworkoutcontext must be inside an workoutcontextprovider");
  }

  return context;
};
