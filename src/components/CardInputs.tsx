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
        value={props.cardDetails.cardNumber}
      />
      <div className="d-flex gap-3">
        <TextField
          id="cardDate"
          label="Expiration"
          variant="outlined"
          onChange={cardInputHandler}
          value={props.cardDetails.cardDate}
        />
        <TextField
          id="cvv"
          label="CVC/CVV"
          variant="outlined"
          onChange={cardInputHandler}
          value={props.cardDetails.cvv}
        />
      </div>
    </div>
  );
};

export default CardInputs;
