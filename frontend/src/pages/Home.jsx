import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

import { useWorkoutContext } from "../hooks/useWorkoutContext";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);

  const {workout,dispatch} = useWorkoutContext()


  useEffect(() => {
    const fetchWorkout = async () => {
     try {
       const response = await fetch("http://localhost:4000/api/workouts");
       const json = await response.json();
       if (response.ok) {
         //  setWorkouts(json);
         dispatch({type:'SET_WORKOUT',payload:json})
       } else {
         console.log("Server returned an error:", json);
       }
     } catch (error) {
       console.error("Error fetching data:", error);
     }
    };

    fetchWorkout();
  }, [dispatch]);

    // const [dataFromChild, setDataFromChild] = useState(null);

  // const handlechilddata = (childdata) => {
  //   console.log("This is from home: ",childdata)
  //   setDataFromChild(childdata)
  // }
// console.log(dataFromChild)
  return (
    <div className="home">
      <div className="workout">
        {workout &&
          workout.map((items) => (
            <WorkoutDetails key={items._id} items={items} />
          ))}
      </div>
      <WorkoutForm  />
      
    </div>
  );
};

export default Home;
