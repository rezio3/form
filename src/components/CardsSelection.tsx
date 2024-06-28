import React, { useEffect, useState } from "react";
import { CardData, CardSelectProps } from "../types";
import CardButton from "./CardButton";

const CardsSelection = (props: CardSelectProps) => {
  const [fetchedCards, setFetchedCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = async () => {
    const response = await fetch(
      "https://api.stripe.com/v1/payment_methods?type=card&customer=cus_QN0gD8DN4RxDwi",
      {
        headers: {
          Authorization:
            "Bearer sk_test_51PWEL9Foou8wOMVk7aqtqoEJBC4wtADFhUYcUabd497Q0MUYJ16qcNGZsl20ejWB23Lrs7PKkxpK5zTXjVyHjnM300JIwTemCC",
        },
      }
    );
    const data = await response.json();
    setLoading(false);
    data.data.selected = false;
    setFetchedCards(data.data);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="d-flex flex-column ms-auto gap-1 select-card-container">
      <h4 className="text-secondary">Choose a card</h4>

      {loading ? (
        <div className="loader-container mt-4">
          <div className="spinner" />
        </div>
      ) : null}
      {fetchedCards.map((singleFetchedCard) => {
        const { card } = singleFetchedCard;
        return (
          <CardButton
            singleFetchedCard={singleFetchedCard}
            key={card.id}
            setSelectedCard={props.setSelectedCard}
          />
        );
      })}
    </div>
  );
};

export default CardsSelection;
