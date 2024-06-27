export type OptionType = {
  label: string;
};

export type CardDetails = {
  cardNumber: string;
  cardDate: string;
  cvv: string;
};

export type CardInputsProps = {
  cardDetails: CardDetails;
  setCardDetails: (value: CardDetails) => void;
};

export type CardData = {
  card: {
    last4: string;
    exp_month: string;
    exp_year: string;
    brand: string;
  };
};
