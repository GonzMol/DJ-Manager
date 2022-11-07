import React from "react";
import SetDetailsCSS from "./SetDetails.module.css";

const SetDetails = (props) => {
    const title = props.data.title;
    const creator = props.data.creator;
    const tags = props.data.tags.join(", ");

    const setTitle = props.setTitle;
    const setCreator = props.setCreator;

    const changeTitle = (event) => {
        setTitle(event.target.value);
      }

    const changeCreator = (event) => {
        setCreator(event.target.value);
    }

    const disabled = props.disabled ? SetDetailsCSS.disabled : "";
    const readonly = props.disabled ? "readonly" : "";

    return (
        <div className = {SetDetailsCSS.details}>
            <div className = {SetDetailsCSS.headers}>
                <div><p>Title</p></div>
                <div><p>Creator</p></div>
                <div><p>Tags</p></div>
            </div>
            <div className = {SetDetailsCSS.data}>
                <input
                    type="text"
                    value={title}
                    onChange={changeTitle}
                    className={disabled}
                    readOnly={readonly}
            ></input>
            <input
                type="text"
                value={creator}
                onChange={changeCreator}
                className={disabled}
                readOnly={readonly}
        ></input>
                <div><p>{tags}</p></div>
            </div>
        </div>
    )
}

export default SetDetails;