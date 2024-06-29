import TextField from "@mui/material/TextField";
import { onlyDigits } from "../functions/onlyDigits";
import { CardInputsProps } from "../types";

const CardInputs = (props: CardInputsProps) => {
  const cardInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    const inputValue = onlyDigits(value);
    if (id === "cardNumber" && value.length > 19) return;
    if (id === "cardDate" && value.length > 7) return;
    if (id === "cvv" && value.length > 3) return;
    props.setCardDetails({
      ...props.cardDetails,
      [id]: inputValue,
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
        placeholder="1111 1111 1111 1111"
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
          placeholder="11/11"
        />
        <TextField
          id="cvv"
          label="CVC/CVV"
          variant="outlined"
          onChange={cardInputHandler}
          value={props.selectedCard === null ? props.cardDetails.cvv : `***`}
          disabled={props.selectedCard === null ? false : true}
          placeholder="111"
        />
      </div>
    </div>
  );
};

export default CardInputs;
