import "../style/form.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { CardData, OptionType } from "../types";
import { useEffect, useState } from "react";
import { defaultUsers } from "../data/users";
import { countryOptions } from "../data/countryOptions";
import CardInputs from "./CardInputs";
import Button from "@mui/material/Button";
import "../style/spinner.scss";
import CardsSelection from "./CardsSelection";

const Form = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [defaultUser, setDefaultUser] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardDate: "",
    cvv: "",
  });
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  useEffect(() => {
    const pickDefaultUser = defaultUsers.find(
      (e) => e.country === selectedCountry
    );
    setDefaultUser(pickDefaultUser?.name || "");
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCard !== null) {
      switch (selectedCard.billing_details.address.country) {
        case "PL":
          setSelectedCountry(countryOptions[0].label);
          break;
        case "US":
          setSelectedCountry(countryOptions[1].label);
          break;
      }
    }
  }, [selectedCard]);

  const countryInputHandler = (
    event: React.ChangeEvent<{}>,
    value: OptionType | null
  ) => {
    value ? setSelectedCountry(value.label) : setSelectedCountry("");
  };

  const clearBtnHandler = () => {
    setCardDetails({
      cardNumber: "",
      cardDate: "",
      cvv: "",
    });
    setSelectedCountry("");
    setSelectedCard(null);
  };

  return (
    <div className="p-5 d-flex form-container gap-3 overflow-auto">
      <form className="d-flex flex-column gap-3">
        <CardInputs
          cardDetails={cardDetails}
          setCardDetails={setCardDetails}
          selectedCard={selectedCard}
        />
        <div className="d-flex gap-3">
          <TextField
            disabled
            id="outlined-disabled"
            label="Name on card"
            value={defaultUser}
          />
        </div>
        <Autocomplete
          disablePortal
          disabled={selectedCard !== null}
          id="combo-box-demo"
          options={countryOptions}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Country" />}
          onChange={countryInputHandler}
          inputValue={selectedCountry}
        />
        <div className="d-flex gap-3">
          <Button variant="contained" onClick={clearBtnHandler}>
            Clear
          </Button>
        </div>
      </form>
      <div className="divider mx-3" />
      <CardsSelection
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
      />
    </div>
  );
};

export default Form;
