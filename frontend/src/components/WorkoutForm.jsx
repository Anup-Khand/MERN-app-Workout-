import { useEffect, useState } from "react";

import { useWorkoutContext } from "../hooks/useWorkoutContext";
const WorkoutForm = () => {
  const { workout, dispatch, id } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");
  const [emptyfield, setemptyfield] = useState([]);
  const [toggle, settoggle] = useState(true);

  console.log("This is from form", id);

  const handlesubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };

    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setemptyfield(json.emptyfield);
    }

    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setemptyfield([]);
      console.log("New Workout is adeed");
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };
  // fetch single data on clicking update
  useEffect(() => {
    console.log("render");
    if (id === undefined) {
      settoggle(true);
    } else {
      settoggle(false);
      if (workout) {
        console.log("This is workout details", workout);
        const SingleWorkout = workout.find((obj) => obj._id === id);
        const { title, load, reps } = SingleWorkout;
        setTitle(title);
        setLoad(load);
        setReps(reps);
      }
    }
  }, [id, workout]);

  // handle update

  const handleupdate = async (e) => {
    e.preventDefault();
    const updatedworkout = { title, load, reps };
    console.log("update workout", updatedworkout);
    const response = await fetch("http://localhost:4000/api/workouts/" + id, {
      method: "PUT",
      body: JSON.stringify(updatedworkout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setError(json.error);
      setemptyfield(json.emptyfield);
    }

    if (response.ok) {
      settoggle(true);
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setemptyfield([]);
      console.log("Workout is updated");
      console.log(workout);
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
    }
  };

  return (
    <form action="">
      <h3>Add a New Workout</h3>
      <label>Exerscise Title: </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyfield.includes("title") ? "error" : ""}
      />

      <label>Load (in kg): </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyfield.includes("load") ? "error" : ""}
      />

      <label>Reps: </label>
      <input
        type="text"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyfield.includes("reps") ? "error" : ""}
      />
      {toggle ? (
        <button onClick={handlesubmit}>Add workout</button>
      ) : (
        <button onClick={handleupdate}>Update workout</button>
      )}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
