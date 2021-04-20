import React, { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, createDeck, updateDeck } from "../utils/api/index";
import { ErrorMessage } from "../utils/ErrorMessage";

// Use the same page to create or edit an existing deck
export const CreateEditDeck = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const handleNameChange = (event) =>
    setDeck({ ...deck, name: event.target.value });
  const handleDescriptionChange = (event) =>
    setDeck({ ...deck, description: event.target.value });
  const history = useHistory();
  const [error, setError] = useState(undefined);


  // Handle the submit button.  If we have a deck, update it, otherwise create the new deck.
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    if (deckId) {
      updateDeck(deck, abortController.signal)
        .then(history.goBack)
        .catch(setError);
    } else {
      createDeck(deck, abortController.signal)
        .then((result) => window.location.replace(`/decks/${result.id}`))
        .catch(setError);
    }
  };

  // If there is an existing deck, read it so we can edit the information.
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
      <BreadCrumb
        deck={deck ? deck : undefined}
        description={deckId ? "Edit Deck" : "Create Deck"}
      />
      <form className="col-12" onSubmit={handleSubmit}>
        <div className="row">
          {deckId ? <h1>Edit</h1> : <h1>Create Deck</h1>}
        </div>
        <div className="row">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="col-12"
            onChange={handleNameChange}
            value={deck.name}
            placeholder="Deck Name"
          />
        </div>
        <div className="row mt-4">
          <label htmlFor="description">Description</label>
          <textarea
            type="textarea"
            id="description"
            name="description"
            className="col-12"
            onChange={handleDescriptionChange}
            value={deck.description}
            placeholder="Brief description of the deck"
            rows={4}
          />
        </div>
        <div className="row mt-2">
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditDeck;
