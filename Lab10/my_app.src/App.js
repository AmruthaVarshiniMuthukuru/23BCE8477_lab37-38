import React from "react";
import FormValidation from "./FormValidation";
import ItemList from "./ItemList";
import FetchData from "./FetchData";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Exercise 1</h2>
      <FormValidation />

      <hr />

      <h2>Exercise 2</h2>
      <ItemList />

      <hr />

      <h2>Exercise 3</h2>
      <FetchData />
    </div>
  );
}

export default App;