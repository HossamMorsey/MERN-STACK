import { deleteIcon, editIcon } from "../utils/utils";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import UpdateWorkout from "./UpdateWorkout.js";
import Modal from "react-modal";
import { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const [showEditArea, setShowEditArea] = useState(false);

  const onClickDelete = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  const onClickEdit = () => {
    setShowEditArea((current) => !current);
  };
  const handleOnClose = () => {
    setShowEditArea(false);
  };



  return (
    <div className="workout-details">
      <div className="details-collection">
        <h4>{workout.title}</h4>
        <p>
          <strong>Load (kg): </strong>
          {workout.load}
        </p>
        <p>
          <strong>Number of reps: </strong>
          {workout.reps}
        </p>
        <p>
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
      <div className="btns-collection">
        <button onClick={onClickDelete}>
          <img alt="delete" className="btn-icon" src={deleteIcon} />
        </button>
        <button onClick={onClickEdit}>
          <img alt="edit" className="btn-icon" src={editIcon} />
        </button>
        {showEditArea && (
          <Modal isOpen={showEditArea}>
            <button onClick={handleOnClose}> X </button>
            <UpdateWorkout
              workout={workout}
              showModal={showEditArea}
              setShowEditArea={setShowEditArea}
              // handleOnFieldChange ={handleOnFieldChange}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default WorkoutDetails;
