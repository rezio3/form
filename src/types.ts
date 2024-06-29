export type OptionType = {
  label: string;
};

export type CardDetails = {
  cardNumber: string;
  cardDate: string;
  cvv: string;
};

export type CardData = {
  id: string;
  billing_details: {
    address: {
      country: string;
    };
  };
  card: {
    last4: string;
    exp_month: string;
    exp_year: string;
    brand: string;
    id: string;
  };
};

export type CardInputsProps = {
  cardDetails: CardDetails;
  setCardDetails: (value: CardDetails) => void;
  selectedCard: CardData | null;
};

export type CardSelectProps = {
  selectedCard: CardData | null;
  setSelectedCard: (value: CardData | null) => void;
};

export type CardButtonProps = {
  singleFetchedCard: CardData;
  setSelectedCard: (value: CardData | null) => void;
  buttonVariant: "outlined" | "contained";
};
