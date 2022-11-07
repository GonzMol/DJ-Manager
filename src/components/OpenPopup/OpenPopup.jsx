import React from "react";
import OpenPopupCSS from "./OpenPopup.module.css";

const OpenPopup = (props) => {
    const open = props.open;
    const text = props.text;
    const styleClass = props.styleClass;

    /* This has the class that is used for the styling of the button
    as it is more convenient to store it here rather than pass a CSS
    prop through */
    let OpenPopupClass;

    switch (styleClass) {
        case "addSong":
            OpenPopupClass = OpenPopupCSS.addSong;
            break;
        case "editDetails":
            OpenPopupClass = OpenPopupCSS.editDetails;
            break;
        case "addAlbum":
            OpenPopupClass = OpenPopupCSS.addAlbum;
            break;
        case "deleteAlbum":
            OpenPopupClass = OpenPopupCSS.addAlbum + " " + OpenPopupCSS.deleteAlbum;
            break;
        default:
            OpenPopupClass = null;
            break;
    }

    return (
        <button onClick = {open} className = {OpenPopupClass + " " + OpenPopupCSS.defaultSettings}>{text}</button>
    );
}

export default OpenPopup;