import TextField from "@mui/material/TextField";
import { onlyDigits } from "../functions/onlyDigits";
import { CardInputsProps } from "../types";

const CardInputs = (props: CardInputsProps) => {
  const cardInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = onlyDigits(event.target.value);
    props.setCardDetails({
      ...props.cardDetails,
      [event.target.id]: inputValue,
    });
  };
  return (
    <div className="d-flex flex-column gap-3">
      <TextField
        id="cardNumber"
        label="Card number"
        variant="outlined"
        onChange={cardInputHandler}
        value={
          props.selectedCard === null
            ? props.cardDetails.cardNumber
            : `**** **** **** ${props.selectedCard?.card.last4}`
        }
        disabled={props.selectedCard === null ? false : true}
      />
      <div className="d-flex gap-3">
        <TextField
          id="cardDate"
          label="Expiration"
          variant="outlined"
          onChange={cardInputHandler}
          value={
            props.selectedCard === null
              ? props.cardDetails.cardDate
              : `${props.selectedCard?.card.exp_month} / ${props.selectedCard?.card.exp_year}`
          }
          disabled={props.selectedCard === null ? false : true}
        />
        <TextField
          id="cvv"
          label="CVC/CVV"
          variant="outlined"
          onChange={cardInputHandler}
          value={props.selectedCard === null ? props.cardDetails.cvv : `***`}
          disabled={props.selectedCard === null ? false : true}
        />
      </div>
    </div>
  );
};

export default CardInputs;
