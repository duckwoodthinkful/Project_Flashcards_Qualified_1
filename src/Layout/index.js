import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import DeckDetail from "./DeckDetail";
import DeckList from "./DeckList";
import CreateEditDeck from "./CreateEditDeck";
import CreateEditCard from "./CreateEditCard";
import Study from "./Study";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* DONE: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <DeckList />
          </Route>
          <Route path="/decks/new">
            <CreateEditDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <CreateEditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CreateEditCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CreateEditCard />
          </Route>
          <Route path="/decks/:deckId">
            <DeckDetail />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
