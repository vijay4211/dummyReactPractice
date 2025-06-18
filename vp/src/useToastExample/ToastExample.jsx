
import React from "react";
import useToast from "./useToast";

export default function ToastExample() {
  const toast = useToast();
  return <button onClick={() => toast("hello")}>Show Toast</button>;
}
