import React, { useState } from "react";
import { deleteCard } from "../utils/api/index";
import { useHistory } from "react-router-dom";
import { ErrorMessage } from "../utils/ErrorMessage";

// Display relevant information regarding a specific card in a deck
export const Card = ({ card }) => {
  const [error, setError] = useState(undefined);
  const history = useHistory();

  // Handle clicking on the trashcan button
  function handleDeleteCard() {
    if (
      window.confirm("Delete this card?  You will not be able to recover it.")
    ) {
      const abortController = new AbortController();

      deleteCard(card.id, abortController.signal)
        .then(history.go(0))
        .catch(setError);

      return () => abortController.abort();
    }
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="row card col-11 rounded-8 mb-1 ml-3 mr-4">
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <p>{card.front}</p>
          </div>
          <div className="col-6">
            <p>{card.back}</p>
          </div>
        </div>
        <div className="row">
          <div className="d-flex ml-auto">
            <a
              role="button"
              className="btn btn-secondary mr-2"
              href={`/decks/${card.deckId}/cards/${card.id}/edit`}
            >
              <span className="oi oi-book" />
              {` Edit`}
            </a>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteCard}
            >
              <span className="oi oi-trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
