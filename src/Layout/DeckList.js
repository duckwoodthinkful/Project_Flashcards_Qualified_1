import React, { useEffect, useState } from "react";
import Deck from "./Deck";
import { Link, Switch, Route } from "react-router-dom";
import { listDecks } from "../utils/api/index";

const ErrorMessage = ({ error, children }) => (
  <main className="container">
    <p style={{ color: "red" }}>ERROR: {error.message}</p>
    {children}
  </main>
);

// Show a list of all of the decks available
export const DeckList = () => {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined);

  // Use the api to get a list of the decks
  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal).then(setDecks).catch(setError);

    return () => abortController.abort();
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  // Map these decks onto deck renders
  const list = decks.map((deck) => <Deck key={deck.id} deck={deck} />);

  return (
    <main className="container">
      <Switch>
        <Route exact path="/">
          <Link role="button" className="btn btn-secondary" to="/decks/new">
            <span className="oi oi-plus" />
            {` Create Deck`}
          </Link>
          <section className="row">{list}</section>
        </Route>
      </Switch>
    </main>
  );
};

export default DeckList;
