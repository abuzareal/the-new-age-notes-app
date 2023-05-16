import React from "react";
import DraggableItem from "./DraggableItem";

function NoteItems({list, deleteNote}) {
  return (
    <div>
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
    </div>
  );
}

export default NoteItems;
