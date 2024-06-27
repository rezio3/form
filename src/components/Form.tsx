import "../style/form.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { OptionType } from "../types";
import { useEffect, useState } from "react";
import { defaultUsers } from "../data/users";
import { countryOptions } from "../data/countryOptions";
import CardInputs from "./CardInputs";
import Button from "@mui/material/Button";

const Form = () => {
  const [selectedContry, setSelectedCountry] = useState("");
  const [defaultUser, setDefaultUser] = useState({
    name: "",
    surname: "",
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardDate: "",
    cvv: "",
  });

  const countryInputHandler = (
    event: React.ChangeEvent<{}>,
    value: OptionType | null
  ) => {
    value ? setSelectedCountry(value.label) : setSelectedCountry("");
  };

  useEffect(() => {
    const pickDefaultUser = defaultUsers.find(
      (e) => e.country === selectedContry
    );
    setDefaultUser({
      name: pickDefaultUser?.name || "",
      surname: pickDefaultUser?.surname || "",
    });
  }, [selectedContry]);

  return (
    <div className="w-50 p-5 d-flex flex-column align-items-start form-container gap-3 overflow-auto">
      <div className="d-flex gap-3">
        <TextField
          disabled
          id="outlined-disabled"
          label="Name"
          value={defaultUser.name}
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Surname"
          value={defaultUser.surname}
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
      <CardInputs cardDetails={cardDetails} setCardDetails={setCardDetails} />
      <div className="d-flex gap-3">
        <Button variant="contained">Submit</Button>
        <Button variant="outlined">Clear</Button>
      </div>
    </div>
  );
};

export default Form;
