import PropTypes from "prop-types";
import './workoutdetail.css'
import { useWorkoutContext } from '../hooks/useWorkoutContext'

const WorkoutDetails = ({ items }) => {

  const {dispatch} = useWorkoutContext()

  const handleClick = async () => {
    const response = await fetch('http://localhost:4000/api/workouts/' + items._id, {
      method:'DELETE'
    })
    const json = await response.json()
console.log('delete',json)
    if (response.ok) {
      dispatch({type:'DELETE_WORKOUT',payload:json})
    }
  }

  const handleupdate = () => {
    // console.log(items._id)
    // onchilddata(items._id)
    dispatch({type:'SET_ID',payload:items._id})
  }
  

  return (
    <div className="details">
      <div className="detail1">
        <h4 className="detailstitle">{items.title}</h4>
        <p className="detailsload">
          <strong>Load (kg):</strong>
          {items.load}
        </p>
        <p className="detailsreps">
          <strong>Reps: </strong>
          {items.reps}
        </p>
        <p className="detailcreatedat">{items.createdAt}</p>
      </div>
      <div className="btn">
        <span className="detaildelete" onClick={handleClick}>
          Delete
        </span>

        <span className="detailupdate" onClick={handleupdate}>Update</span>
      </div>
    </div>
  );
};
WorkoutDetails.propTypes = {
  items: PropTypes.shape({
    _id:PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    load: PropTypes.number.isRequired,
    reps: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired
};
export default WorkoutDetails;
