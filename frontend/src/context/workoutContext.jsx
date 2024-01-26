import { createContext, useReducer } from "react";

import PropTypes from "prop-types";

export const workoutContext = createContext();

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUT":
      return { workout: action.payload };
    case "CREATE_WORKOUT":
      return {
        workout: [action.payload, ...state.workout],
      };
    case "DELETE_WORKOUT":
      return {
        workout: state.workout.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_WORKOUT":
      return {...state,
        workout: state.workout.map((w) =>
          w._id === action.payload._id ? action.payload : w
        ),
      };
    case 'SET_ID':
        return {
          ...state,
          id: action.payload,
        };

    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workout: null,
    SID:null
  });

  return (
    <workoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </workoutContext.Provider>
  );
};

WorkoutContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
