import "./App.css";
import React, { useEffect, useRef, useState } from "react";

import AlertToast from "./components/UI/Alerts/AlertToast";
import Footer from "./components/UI/Footer";
import InputForm from "./components/InputForm";
import NoteItems from "./components/NoteItems";
import items from "./Models/MockItem";
import error from "./assets/Audio/error.mp3";

const App: React.FC = () => {
  const [item, setItem] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [list, setList] = useState(() => {
    try {
      const storedNotes = localStorage.getItem("notes");
      console.log(storedNotes);
      let parsedNotes = storedNotes ? JSON.parse(storedNotes) : items;

      parsedNotes = parsedNotes.map((note: any) => ({
        ...note,
        xPos: Math.random() * (window.innerWidth / 3), // Modify this line based on your requirements
        yPos: Math.random() * (window.innerHeight / 3), // Modify this line based on your requirements
      }));
      console.log(parsedNotes);
      return parsedNotes;
    } catch (error) {
      console.error("Error parsing local storage data:", error);
      return items;
    }
  });
  const [isValid, setIsValid] = useState(false); // Track if input is valid
  const audioRef = useRef<HTMLAudioElement>(null);
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
        xPos: Math.random() * window.innerWidth, // Modify this line based on your requirements
        yPos: Math.random() * window.innerHeight, // Modify this line based on your requirements
      };

      // Add the item to the list

      setList([...list, newItem]);
      // Reset the input field

      setItem("");
      setIsValid(true);
    } else {
      setIsValid(false);
      if (audioRef.current) audioRef.current.play();
    }
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(list));
  }, [list]);

  const deleteNote = (id: any): void => {
    setList(list.filter((item: { id: any }) => item.id !== id));
  };

  return (
    <>
      <div className="App">
        <h1>Starboard 👾</h1>

        <NoteItems list={list} deleteNote={deleteNote} />

        <InputForm
          submitHandler={submitHandler}
          item={item}
          changeHandler={changeHandler}
        />

        {submitted && !isValid && (
          <>
            <AlertToast />
            <audio ref={audioRef}>
              <source src={error} type="audio/mpeg" />
            </audio>
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default App;
