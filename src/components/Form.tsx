import "../style/form.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { OptionType } from "../types";
import { useEffect, useRef, useState } from "react";
import { defaultUsers } from "../data/users";
import { countryOptions } from "../data/countryOptions";
import CardInputs from "./CardInputs";
import Button from "@mui/material/Button";

const Form = () => {
  const [selectedContry, setSelectedCountry] = useState("");
  const [defaultUser, setDefaultUser] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardDate: "",
    cvv: "",
  });

  useEffect(() => {
    const pickDefaultUser = defaultUsers.find(
      (e) => e.country === selectedContry
    );
    setDefaultUser(pickDefaultUser?.name || "");
  }, [selectedContry]);

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
  };
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form
      onSubmit={submitHandler}
      className="w-50 p-5 d-flex flex-column align-items-start form-container gap-3 overflow-auto"
    >
      <CardInputs cardDetails={cardDetails} setCardDetails={setCardDetails} />
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
        id="combo-box-demo"
        options={countryOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Country" />}
        onChange={countryInputHandler}
      />
      <div className="d-flex gap-3">
        <Button variant="contained" type="submit">
          Submit
        </Button>
        <Button variant="outlined" onClick={clearBtnHandler}>
          Clear
        </Button>
      </div>
    </form>
  );
};

export default Form;
