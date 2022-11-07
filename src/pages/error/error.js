import React from "react";

/* Send user here when they have a bad request of a page.*/

export default function Error() {
  return (
    <div style = {{display: "flex", "justify-content": "center", "align-items": "center", height: "60vh"}}>
      <h1 style = {{flex: "none", "font-size": "48px"}}>ERROR, PAGE NOT FOUND!</h1>
    </div>
  );
}