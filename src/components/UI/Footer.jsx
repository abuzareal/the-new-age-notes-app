import React from "react";
import { DiReact } from "react-icons/di";

function Footer() {
  return (
    <div className="footer">
      <p>Made with </p>
      <DiReact
        color="
            #61dafb"
        size="1.5rem"
        style={{
          margin: "0.25rem",
        }}
      />
      <p>
        by Nischal and Abuzar
        <br />
      </p>
    </div>
  );
}

export default Footer;
