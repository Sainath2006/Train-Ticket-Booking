import React from "react";
import { useNavigate } from "react-router-dom";

function TrainList({ trains, onBook }) {
  const navigate = useNavigate();

  const handleBookClick = (train) => {
    onBook(train);
    navigate("/passenger"); // Next page
  };

  return (
    <div className="form-container">
      <h2>Available Trains</h2>
      <ul>
        {trains.map((train) => (
          <li key={train.id}>
            {train.name}
            <button onClick={() => handleBookClick(train)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrainList;
