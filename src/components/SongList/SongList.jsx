import React from "react";
import SongListCSS from "./SongList.module.css";
import Song from "../Song/Song";

const SongList = (props) => {
    const { songs } = props;
    const editable = props.editable;
    const deleteSong = props.deleteSong;

    return (
        <div className = {SongListCSS.songs}>
            <p>Songs</p>
            <div className = {SongListCSS.scroll}>
            {songs.map((song) => {
                return <Song key = {song._id} song = {song} editable = {editable} deleteSong = {deleteSong}/>;
            })}
            </div>
        </div>
    )
}

export default SongList;