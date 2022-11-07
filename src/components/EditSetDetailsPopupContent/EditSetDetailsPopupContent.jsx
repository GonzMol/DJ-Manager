import React, {useState, forwardRef, useImperativeHandle} from "react";
import EditDetailsPopupContentCSS from "./EditSetDetailsPopupContent.module.css";
import ItemList from "../ItemList/ItemList";

const EditSetDetailsPopupContent = forwardRef((props, ref) => {

    // State of popup
    const [tags, setTags] = useState([]);
    const [tagsInput, setTagsInput] = useState("");

    // Modify data for parent
    const modifyData = props.modifyData;

    // Updates the function in parent.
    useImperativeHandle(ref, () => ({

        clear: () => {
            setTagsInput("");
        },

        submitConditions: () => true,

        onSubmit: () => {
            const setDetails = {
                tags: tags
            }

            modifyData(setDetails);
        }
    
      }));

    const changeTagsText = (event) => {
        setTagsInput(event.target.value);
    }

    const addTag = () => {
        if (!tags.includes(tagsInput) && tagsInput !== "") {
            setTags(tags.concat(tagsInput));
            setTagsInput("");
        }
    }

    return (
        <div className = {EditDetailsPopupContentCSS.container}>
            <div className = {EditDetailsPopupContentCSS.popupEntry}>
                <button onClick = {addTag}>Add Tag</button>
                <input type="text" value = {tagsInput} onChange = {changeTagsText}></input>
            </div>
            <ItemList items = {tags} setItems = {setTags} addButtonText = "Tags:" />
        </div>
    )
});

export default EditSetDetailsPopupContent;