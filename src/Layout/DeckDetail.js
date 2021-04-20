import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api/index";
import { ErrorMessage } from "../utils/ErrorMessage";
import { CardList } from "./CardList";
import { BreadCrumb } from "./BreadCrumb";

// Show the details about a specific deck, including all cards
export const DeckDetail = () => {
  const [error, setError] = useState(undefined);
  const { deckId } = useParams();
  const [deck, setDeck] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal).then(setDeck).catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  // Handle someone clicking on the delete deck button.
  function handleDeleteDeck() {
    console.log("DeleteDeck");
    if (
      window.confirm("Delete this deck?  You will not be able to recover it.")
    ) {
      const abortController = new AbortController();

      deleteDeck(deck.id, abortController.signal)
        .then(history.go(-1))
        .catch(setError);

      return () => abortController.abort();
    }
  }

  if (deck) {
    return (
      <div>
        <BreadCrumb description={deck.name} />
        <div className="row card col-12 rounded-8 mt-3 m-2">
          <div className="card-body">
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text">{deck.description}</p>
            <div className="row">
              <div className="d-flex pr-2 ">
                <Link
                  role="button"
                  className="btn btn-secondary"
                  to={`/decks/${deck.id}/Edit`}
                >
                  <span className="oi oi-pen" />
                  {` Edit`}
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
              <div className="d-flex pr-2 ">
                <a
                  role="button"
                  className="btn btn-primary"
                  href={`/decks/${deck.id}/cards/new`}
                >
                  <span className="oi oi-plus" />
                  {` Add Cards`}
                </a>
              </div>
              <div className="d-flex ml-auto text-right">
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
        <section className="row">
          <CardList cards={deck.cards} />
        </section>
      </div>
    );
  } else
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
};
export default DeckDetail;
