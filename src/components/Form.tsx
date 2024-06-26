import "../style/form.scss";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Form = () => {
  type OptionType = {
    label: string;
  };
  const autocompleteHandler = (
    event: React.ChangeEvent<{}>,
    value: OptionType | null
  ) => {
    console.log(event.target);
    if (value) {
      console.log(value.label);
    }
  };
  const options: OptionType[] = [{ label: "Poland" }, { label: "USA" }];

  return (
    <div className="w-50 h-50 p-5 d-flex flex-column form-container gap-3">
      <div className="d-flex gap-3">
        <TextField
          disabled
          id="outlined-disabled"
          label="Name"
          defaultValue="Jan"
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Surname"
          defaultValue="Kowalski"
        />
      </div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Country" />}
        onChange={autocompleteHandler}
      />
    </div>
  );
};

export default Form;
