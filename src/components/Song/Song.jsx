import React from "react";
import SongCSS from "./Song.module.css";

const giveCss = editable => editable ? SongCSS.hasCross : "";;

const Song = (props) => {
  const editable = props.editable;
  const deleteSong = props.deleteSong;

  return (
    <div className={SongCSS.song + " " + (giveCss(editable))}>
      <div className={SongCSS.container}>
        <p>
          {props.song.title} - {props.song.artists.join(", ")}
        </p>
      </div>
      {editable && (
        <div
          className={SongCSS.cross}
          onClick={() => {
            deleteSong(props.song);
          }}
        >
          &times;
        </div>
      )}
    </div>
  );
};

export default Song;
export {giveCss};
