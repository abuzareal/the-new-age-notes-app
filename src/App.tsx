import "./App.css";
import React, { useState } from "react";

import DraggableItem from "./components/DraggableItem";


import AlertToast from "./components/UI/Alerts/AlertToast";
import Footer from "./components/UI/Footer";
import InputForm from "./components/InputForm";
import NoteItems from "./components/NoteItems";
import items from "./Models/MockItem";

function App() {
  

  const [item, setItem] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [list, setList] = useState(items); // List of items
  const [isValid, setIsValid] = useState(false); // Track if input is valid
  // Track if form is submitted

  const changeHandler = (e: any) => {
    e.preventDefault(); // Prevent form submission and page refresh

    // Get the value from the input
    const value = e.target.value;

    // Check if the value is valid

    setItem(value);
    setIsValid(true);
  };

  const submitHandler = (e: any) => {
    e.preventDefault(); // Prevent form submission and page refresh

    // Mark form as submitted
    setSubmitted(true);
    setIsValid(true);

    // Check if the item is not empty
    if (item.trim() !== "") {
      // Create a new item
      const newItem = {
        id: list.length + 1,
        name: item,
        xPos: Math.random() * 250,
        yPos: Math.random() * 250,
      };

      // Add the item to the list
      setList([...list, newItem]);
      // Reset the input field

      setItem("");
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const deleteNote = (id: any): void => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="App">
        <h1>Starboard 👾</h1>

        <NoteItems list={list} deleteNote={deleteNote} />
        
        <InputForm submitHandler={submitHandler} item={item} changeHandler={changeHandler} />

        {submitted && !isValid && <AlertToast />}
        <Footer />
      </div>
    </>
  );
}

export default App;
