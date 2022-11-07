import React, {useState, forwardRef, useImperativeHandle} from "react";
import AddSongPopupContentCSS from "./AddSongPopupContent.module.css";
import ItemList from "../ItemList/ItemList";

const AddSongPopupContent = forwardRef((props, ref) => {

     // The state of the popup
     const [artists, setArtists] = useState([]);
     const [artistInput, setArtistInput] = useState("");
     const [titleInput, setTitleInput] = useState("");

    /* All the functions/functions derived from those passed in */
    const modifyData = props.modifyData;

    // Updates the function in parent. 
    useImperativeHandle(ref, () => ({

        clear: () => {
            setArtistInput("");
            setTitleInput("");
        },

        submitConditions: () => artists.length > 0 && titleInput.length > 0,

        onSubmit: () => {
            const song = {
                _id: Math.floor(Math.random()*10e9),
                title: titleInput,
                artists: artists
            }
    
            modifyData(song);
        }
    
      }));

    const changeTitleText = (event) => {
        setTitleInput(event.target.value);
    }

    const changeArtistText = (event) => {
        setArtistInput(event.target.value);
    }

    const addArtist = () => {
        if (!artists.includes(artistInput) && artistInput !== "") {
            setArtists(artists.concat(artistInput));
            setArtistInput("");
        }
    }

    return (
        <>
        <div className = {AddSongPopupContentCSS.container}>
            <div className = {AddSongPopupContentCSS.popupEntry}>
                <div>Title:</div>
                <input type="text" value = {titleInput} onChange = {changeTitleText}></input>
            </div>
            <div className = {AddSongPopupContentCSS.popupEntry}>
                <button onClick = {addArtist}>Add Artist</button>
                <input type="text" value = {artistInput} onChange = {changeArtistText}></input>
            </div>
            <ItemList items = {artists} setItems = {setArtists} addButtonText = "Artists:" />
        </div>
        </>
    );
});

export default AddSongPopupContent;