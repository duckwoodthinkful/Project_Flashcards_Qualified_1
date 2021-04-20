import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { listCards, deleteDeck } from "../utils/api/index";
import { ErrorMessage } from "../utils/ErrorMessage";


// Given a specific deck, show the relevant information
export const Deck = ({ deck }) => {
  const [error, setError] = useState(undefined);
  const history = useHistory();

  if (error) {
    return <ErrorMessage error={error} />;
  }

  // Handle clicking on the delete deck button.
  function handleDeleteDeck() {
    console.log("DeleteDeck");
    if (
      window.confirm("Delete this deck?  You will not be able to recover it.")
    ) {
      const abortController = new AbortController();

      deleteDeck(deck.id, abortController.signal)
        .then(history.go(0))
        .catch(setError);

      return () => abortController.abort();
    }
  }

  // Get the card information from the deck so we can show how many there are.
  const cards = deck.cards;
  return (
    <div className="row card col-12 rounded-8 mt-3 m-2">
      <div className="card-body">
        <h5 className="card-title">
          <div className="row">
            <div className="col">{deck.name}</div>
            <div className="d-flex align-content-end font-weight-lighter">
              {cards.length + " "} cards
            </div>
          </div>
        </h5>
        <p className="card-text">{deck.description}</p>
        <div className="row">
          <div className="d-flex pr-2 ">
            <Link
              role="button"
              className="btn btn-secondary"
              to={`/decks/${deck.id}`}
            >
              <span className="oi oi-eye" />
              {` View`}
            </Link>
          </div>
          <div className="d-flex pr-2 ">
            <a
              role="button"
              className="btn btn-primary"
              href={`/decks/${deck.id}/study`}
            >
              <span className="oi oi-book" />
              {` Study`}
            </a>
          </div>
          <div className="d-flex ml-auto">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDeleteDeck}
            >
              <span className="oi oi-trash" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Deck;
