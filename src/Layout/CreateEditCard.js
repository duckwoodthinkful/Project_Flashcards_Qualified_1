import React, { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, createCard, updateCard } from "../utils/api/index";
import { ErrorMessage } from "../utils/ErrorMessage";


// Combined function for creating or editing a card
export const CreateEditCard = () => {
  const { deckId, cardId } = useParams();
  const [card, setCard] = useState({ front: "", back: "", deckId: deckId });

  // Update our card with new information for the front
  const handleFrontChange = (event) =>
    setCard({ ...card, front: event.target.value });
  
    // Update our card with new information for the back
  const handleBackChange = (event) =>
    setCard({ ...card, back: event.target.value });
  const history = useHistory();
  const [error, setError] = useState(undefined);
  const [deck, setDeck] = useState({name: "", description: ""});

  // Handle our submit button
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    // If we have an existing card, update it, otherwise, create it.
    if (cardId) {
      updateCard(card, abortController.signal)
        .then(history.goBack)
        .catch(setError);
    } else {
      createCard(deckId, card, abortController.signal)
        .then(history.go(0))
        .catch(setError);
    }
  };

  // Read an existing card
  useEffect(() => {
    const abortController = new AbortController();

    if (cardId) {
      readCard(cardId, abortController.signal).then(setCard).catch(setError);
    }
    return () => abortController.abort();
  }, [cardId]);

  // Read the deck we are currently editing
  useEffect(() => {
    const abortController = new AbortController();

    if (deckId) {
      readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
    }
    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div>
      <BreadCrumb deck={deck} description={cardId ? "Edit Card " + cardId : "Add Card"} />
      <form className="col-12" onSubmit={handleSubmit}>
        <div className="row">
          {cardId ? <h1>Edit</h1> : <h1>{deck.name}: Add Card</h1>}
        </div>
        <div className="row">
          <label htmlFor="name">Front</label>
          <textarea
            id="front"
            name="front"
            className="col-12"
            onChange={handleFrontChange}
            value={card.front}
            placeholder="Front side of card"
            rows={4}
          />
        </div>
        <div className="row mt-4">
          <label htmlFor="description">Back</label>
          <textarea
            id="back"
            name="back"
            className="col-12"
            onChange={handleBackChange}
            value={card.back}
            placeholder="Back side of card"
            rows={4}
          />
        </div>
        <div className="row mt-2">
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={() => history.goBack()}
          >
            {cardId ? "Cancel" : "Done"}
          </button>
          <button type="submit" className="btn btn-primary">
            {cardId ? "Submit" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditCard;
