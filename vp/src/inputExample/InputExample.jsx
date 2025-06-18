import React from "react";
import useInput from "./useInput";

export default function InputExample() {
  const name = useInput("");
  return <input {...name} placeholder="Enter name" />;
}
