import React from "react";
import PopupBackgroundCSS from "./PopupBackground.module.css";

const PopupBackground = (props) => {
    const active = props.active ? PopupBackgroundCSS.active : PopupBackgroundCSS.inactive;

    return (
        <div className = {PopupBackgroundCSS.background + " " + active}></div>
    );
}

export default PopupBackground;