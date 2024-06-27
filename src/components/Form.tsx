import "../style/form.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { OptionType } from "../types";
import { useEffect, useState } from "react";
import { defaultUsers } from "../data/users";
import { countryOptions } from "../data/countryOptions";
import CardInputs from "./CardInputs";
import Button from "@mui/material/Button";
// import { response } from "../mockData";
import { CardData } from "../types";

const Form = () => {
  const [selectedContry, setSelectedCountry] = useState("");
  const [defaultUser, setDefaultUser] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardDate: "",
    cvv: "",
  });

  const [fetchedCards, setFetchedCards] = useState<CardData[]>([]);

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
    setSelectedCountry("");
  };
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

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
    setFetchedCards(data.data);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="p-5 d-flex form-container gap-3 overflow-auto">
      <form onSubmit={submitHandler} className="d-flex flex-column gap-3">
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
          value={selectedContry as any}
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
      <div className="divider mx-3" />
      <div className="d-flex flex-column ms-auto gap-1 h-100">
        <h4>Pick card</h4>
        {fetchedCards.map((e) => {
          console.log(e);
          return (
            <Button
              variant="outlined"
              className="w-100 d-flex flex-column align-items-start"
            >
              <span>**** **** **** {e.card.last4}</span>
              <FontAwesomeIcon icon={faCcMastercard} />
              <div className="w-100 d-flex justify-content-between gap-5">
                <span>
                  Exp. {e.card.exp_month} / {e.card.exp_year}{" "}
                </span>
                <span>CVC: ***</span>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Form;
