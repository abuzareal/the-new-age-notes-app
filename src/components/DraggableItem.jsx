import React, { useRef } from "react";
import Draggable from "react-draggable";
import "./style.css";

import reverse from "../assets/Audio/reverse.mp3";

const DraggableItem = ({ item, xPos, yPos, deleteNote, id }) => {
  const [isDragged, setIsDragged] = React.useState(false);
  const audioRef2 = useRef(null);

  const style = {
    backgroundColor: "#8F43EE",
    color: "white",
    border: "2px solid #ffffff44",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    alignItems: "center",
    padding: "12px",
    textAlign: "left",
    borderRadius: "10px",
    resize: "both",
    boxShadow: isDragged
      ? "0px 0px 100px 0px #8F43EE, 0px 0px 0px 0px #8F43EE "
      : "0px 0px 0px 0px #8F43EE",
    cursor: "move",
    transition: "all 0.4s cubic-bezier(0,.99,.28,1.01)",

    zIndex: "100000000",
    fontWeight: "400",
    fontSize: "1rem",
    fontFamily: "Maven Pro , sans-serif !important;",
    animation: isDragged ? "pulsate 1.3s ease infinite" : "none",
  };

  return (
    <Draggable
      defaultPosition={{
        x: xPos,
        y: yPos,
      }}
      style={{
        position: "absolute",
        zIndex: "1000",
      }}
      onStart={() => {
        setIsDragged(true);
        audioRef2.current.play();
      }}
      onStop={() => {
        setIsDragged(false);
        audioRef2.current.play();
      }}
    >
      <div>
        <h4 style={style}>
          <pre>{item}</pre>
          <button
            onClick={() => {
              deleteNote(id);
            }}
          >
            X
          </button>
        </h4>
        {/* <audio ref={audioRef} style={{}}>
          <source src={noty} type="audio/mpeg" />
        </audio> */}
        <audio ref={audioRef2} style={{}}>
          <source src={reverse} type="audio/mpeg" />
        </audio>
      </div>
    </Draggable>
  );
};

export default DraggableItem;
