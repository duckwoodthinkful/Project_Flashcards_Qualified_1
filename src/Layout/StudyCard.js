import React from "react";

// Actual component shown for each card that is being studied.
export const StudyCard = ({
  card,
  cardLabel,
  handleFlip,
  handleNext,
  isFront,
}) => {
  return (
    <div className="row card col-11 rounded-8 mt-3 m-2">
      <div className="card-body">
      <h3 className="card-title">
        {cardLabel}
        </h3>
        <div className="row pl-3">
            {isFront ? <p>{card.front}</p> : <p>{card.back}</p>}
        </div>
        <div className="row pl-3">
          <button className="btn btn-secondary mr-2" onClick={handleFlip}>
            Flip
          </button>
          { isFront ? (
            <div></div>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
        </div>
    </div>
  );
};

export default StudyCard;
