import React from "react";
import {
  Link,
} from "react-router-dom";

// Make a breadcrumb for which location we are currently visiting.
// We show different information if there is a specific deck or not
export const BreadCrumb = ({ deck, description }) => {
  
  if (deck) {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
        <li ><span className="oi oi-home" /></li>
        
          <li className="breadcrumb-item">
            <Link to="/">{` Home`}</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {description}
          </li>
        </ol>
      </nav>
    );
  } else {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
      <li ><span className="oi oi-home" fill="white"/></li>
        <li className="breadcrumb-item">
        <Link to="/">{` Home`}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {description}
        </li>
      </ol>
    </nav>
  );
};
}

export default BreadCrumb;
