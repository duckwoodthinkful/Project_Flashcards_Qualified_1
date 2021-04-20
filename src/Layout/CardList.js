import React, { useEffect, useState } from "react";
import { ErrorMessage } from "../utils/ErrorMessage";
import Card from "./Card";

// Given a list of cards, display each card in a list
export const CardList = ({cards}) => {
  const [error, setError] = useState(undefined);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const list = cards.map((card, index) => <Card key={index} card={card} />);

  return (
    <main className="container">
      <section className="row">{list}</section>
    </main>
  );
};

export default CardList;
