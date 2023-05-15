import "./App.css";
import React, { useState } from "react";

import DraggableItem from "./components/DraggableItem";
import { MdRocketLaunch } from "react-icons/md";
import { BsClipboardPlus } from "react-icons/bs";

function App() {
  const items = [
    {
      id: 1,
      name: " Make your Note",
      xPos: Math.random() * 250,
      yPos: Math.random() * 250,
    },
    {
      id: 2,
      name: " Get the Milk 🥛",
      xPos: Math.random() * 250,
      yPos: Math.random() * 250,
    },
  ];

  const [item, setItem] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [list, setList] = useState(items); // List of items
  const [isValid, setIsValid] = useState(false); // Track if input is valid
  // Track if form is submitted

  const changeHandler = (e) => {
    e.preventDefault(); // Prevent form submission and page refresh

    // Get the value from the input
    const value = e.target.value;

    // Check if the value is valid

    setItem(value);
    setIsValid(true);
  };

  const submitHandler = (e) => {
    e.preventDefault(); // Prevent form submission and page refresh

    // Mark form as submitted
    setSubmitted(true);

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

  const deleteNote = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="App">
        <h1>Starboard</h1>

        {list.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <DraggableItem
                item={item.name}
                xPos={item.xPos}
                yPos={item.yPos}
                id={item.id}
                deleteNote={deleteNote}
              />
            </React.Fragment>
          );
        })}
        <form onSubmit={submitHandler}>
          {" "}
          {/* Wrap the input and button in a form */}
          <textarea
            type="text"
            value={item}
            onChange={changeHandler}
            placeholder=" 📝 Make your star note..."
            // onBlur={() =>
            //   item.length > 0 ? setIsValid(true) : setIsValid(false)
            // }
          />
          <button type="submit">
            <MdRocketLaunch
              style={{
                color: "white",
                fontSize: "1.75rem",
              }}
            />
          </button>
        </form>

        {submitted && !isValid && (
          <div className="toast">
            {" "}
            <span>Please enter a note</span>{" "}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
