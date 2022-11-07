import React from "react";
import ClosePopupCSS from "./ClosePopup.module.css";

const ClosePopup = (props) => {
    const close = props.close;
    const submit = props.submit;
    const closeText = props.closeText;
    const submitText = props.submitText;


    return (
        <div className = {ClosePopupCSS.container}>
            <button className = {ClosePopupCSS.button} onClick = {close}>{closeText || "Close"}</button>
            {submit != null && <button className = {ClosePopupCSS.button} onClick = {submit}>{submitText || "Submit"}</button>}
        </div>
    );
}

export default ClosePopup;