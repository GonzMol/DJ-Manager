import React, {useState, forwardRef, useImperativeHandle} from "react";
import EditDetailsPopupContentCSS from "./EditAlbumDetailsPopupContent.module.css";
import ItemList from "../ItemList/ItemList";

const EditAlbumDetailsPopupContent = forwardRef((props, ref) => {

    // State of popup
    const [artists, setArtists] = useState([]);
    const [artistInput, setArtistInput] = useState("");

    const [tags, setTags] = useState([]);
    const [tagsInput, setTagsInput] = useState("");

    // Modify data for parent
    const modifyData = props.modifyData;

    // Updates the function in parent.
    useImperativeHandle(ref, () => ({

        clear: () => {
            setArtistInput("");
            setTagsInput("");
        },

        submitConditions: () => true,

        onSubmit: () => {
            const albumDetails = {
                artists: artists,
                tags: tags
            }

            modifyData(albumDetails);
        }
    
      }));

    const changeArtistText = (event) => {
        setArtistInput(event.target.value);
    }

    const changeTagsText = (event) => {
        setTagsInput(event.target.value);
    }

    const addArtist = () => {
        if (!artists.includes(artistInput) && artistInput !== "") {
            setArtists(artists.concat(artistInput));
            setArtistInput("");
        }
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
                <button onClick = {addArtist}>Add Artist</button>
                <input type="text" value = {artistInput} onChange = {changeArtistText}></input>
            </div>
            <ItemList items = {artists} setItems = {setArtists} addButtonText = "Artists:" />
            <div className = {EditDetailsPopupContentCSS.popupEntry}>
                <button onClick = {addTag}>Add Tag</button>
                <input type="text" value = {tagsInput} onChange = {changeTagsText}></input>
            </div>
            <ItemList items = {tags} setItems = {setTags} addButtonText = "Tags:" />
        </div>
    )
});

export default EditAlbumDetailsPopupContent;