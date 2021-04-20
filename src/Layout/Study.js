import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck, listCards } from "../utils/api/index";
import { ErrorMessage } from "../utils/ErrorMessage";
import { StudyCard } from "./StudyCard";
import { BreadCrumb } from "./BreadCrumb";

// This component shows the relevant information about a deck when someone wants to study it.
export const Study = () => {
  const [error, setError] = useState(undefined);
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cardNumber, setCardNumber] = useState(0);
  const [front, setFront] = useState(true);

  // Handle flipping between the front and back of cards
  const handleFlip = () => {
    setFront(!front);
  };

  // Handle going to the next card if there is one, otherwise offer to restart at the beginning.
  const handleNext = () => {
    if (cardNumber === cards.length - 1) {
      if (
        window.confirm(
          "Restart cards?: Click 'cancel' to return to the home page."
        )
      ) {
        setCardNumber(0);
        setFront(true);
      } else window.location.replace("/");
    } else {
      setCardNumber(cardNumber + 1);
      setFront(true);
    }
  };

  // Read the deck information.
  useEffect(() => {
    const abortController = new AbortController();

    readDeck(deckId, abortController.signal).then(setDeck).catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  // Get the cards information from the deck.  If deck is still not loaded, cards will be empty 
  const cards = deck.cards || [];
  
  if (deck && cards) {
    // We only allow studying if the deck has at least 3 cards
    if (cards.length < 3) {
      return (
        <div>
          {" "}
          <BreadCrumb deck={deck} description="Study" />
          <h3>{deck.name}: Study</h3>
          <h3>Not Enough Cards</h3>
          <p>
            You need at least 3 cards to study. There are {cards.length} cards
            in this deck.
          </p>
          <a
            role="button"
            className="btn btn-primary"
            href={`/decks/${deck.id}/cards/new`}
          >
            <span className="oi oi-plus" />
            {` Add Cards`}
          </a>
        </div>
      );
    }

    return (
      <div>
        <BreadCrumb deck={deck} description="Study" />
        <h3>Study: {deck.name}</h3>
        <section className="row">
          <StudyCard
            card={cards[cardNumber]}
            cardLabel = {`Card ${cardNumber+1} of ${cards.length}`}
            handleFlip={handleFlip}
            handleNext={handleNext}
            isFront={front}
            isFirst={cardNumber === 0}
          />
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
export default Study;
