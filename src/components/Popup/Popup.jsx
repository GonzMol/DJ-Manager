import React, {useState, useRef} from "react";
import PopupBackground from "../PopupBackground/PopupBackground";
import OpenPopup from "../OpenPopup/OpenPopup";
import ClosePopup from "../ClosePopup/ClosePopup";
import PopupCSS from "./Popup.module.css";

const Popup = (props) => {

    // A component that represents all the content in the Popup
    const PopupContent = props.PopupContent;

    const [active, setActive] = useState(false);

    // This function modifies the state of whatever the popup passes its data into
    const modifyData = props.modifyData;
    const data = props.data;
    const popupRef = useRef();

    // Opens the popup by setting the active state to true which is passed to 
    // PopupBackground and the popup div
    
    // Opens the popup
    const open = () => {
        call(popupRef.current.onOpen);
        setActive(true);
    }

    // Closes the popup and clears the data in the process
    const close = function() {
        call(popupRef.current.clear);
        setActive(false);
    }

    // Submits the data of the popup
    let submit = () => {
        if (call(popupRef.current.submitConditions)) {
            call(popupRef.current.onSubmit)
            close();
        }
    }
    if (props.disableSubmit)
        submit = null;

    // Verifies that the function exists to run it
    const call = fun => {
        if (typeof fun == "function")
            return fun();
        return true;
    }

    /* Props variables */
    const openText = props.openText;
    const styleClass = props.styleClass;

    let popupActive = active ? PopupCSS.active : PopupCSS.inactive;

    return (
        <>
            <OpenPopup open = {open} text = {openText} styleClass = {styleClass} />
            <PopupBackground active = {active} />
            <div className = {PopupCSS.container + " " + popupActive}>
                <div className = {PopupCSS.popup}>
                    {React.cloneElement(PopupContent, {"modifyData": modifyData, "ref": popupRef, "data": data})}
                    <ClosePopup close = {close} submit = {submit}/>
                </div>
            </div>
        </>
    );
}

export default Popup;