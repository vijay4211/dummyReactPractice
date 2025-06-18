import React from "react";
import { useState } from "react";
import "./App.css";
import InputExample from "./inputExample/InputExample";
import ToastExample from "./useToastExample/ToastExample";
import Loader from "./Loader";
import ThemeExample from "./ThemeExample/ThemeExample";
import ModalExample from "./ModalExample/ModalExample";
import Ecommerce from "./miniEcommerApp/Ecommerce";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Ecommerce />
      </div>
    </>
  );
}

export default App;
