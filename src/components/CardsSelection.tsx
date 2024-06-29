import { useEffect, useState } from "react";
import { CardData, CardSelectProps } from "../types";
import CardButton from "./CardButton";
import { v4 as uuidv4 } from "uuid";

const CardsSelection = (props: CardSelectProps) => {
  const [fetchedCards, setFetchedCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchCards = async () => {
    try {
      const response = await fetch(
        "https://api.stripe.com/v1/payment_methods?type=card&customer=cus_QN0gD8DN4RxDwi",
        {
          headers: {
            Authorization:
              "Bearer sk_test_51PWEL9Foou8wOMVk7aqtqoEJBC4wtADFhUYcUabd497Q0MUYJ16qcNGZsl20ejWB23Lrs7PKkxpK5zTXjVyHjnM300JIwTemCC",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error");
      }
      const data = await response.json();
      setLoading(false);
      setFetchedCards(data.data);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setIsError(true);
      return;
    }
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
      {isError ? (
        <span className="text-secondary h5 mt-4">
          Something went wrong :{"("}
        </span>
      ) : (
        <>
          {fetchedCards.map((singleFetchedCard) => {
            const { card } = singleFetchedCard;
            return (
              <CardButton
                singleFetchedCard={singleFetchedCard}
                key={uuidv4()}
                setSelectedCard={props.setSelectedCard}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default CardsSelection;
