import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import Form from "./components/Form";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <CssBaseline />
      <div className="App d-flex justify-content-center align-items-center">
        <Form />
      </div>
    </>
  );
}

export default App;
