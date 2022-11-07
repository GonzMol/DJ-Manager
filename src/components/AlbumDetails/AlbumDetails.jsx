import React from "react";
import AlbumDetailsCSS from "./AlbumDetails.module.css";

const AlbumDetails = (props) => {
  const title = props.data.title;
  const artists = props.data.artists.join(", ");
  const tags = props.data.tags.join(", ");
  const recordLabel = props.data.record_label;
  const labelNumber = props.data.label_number;
  const setTitle = props.setTitle;
  const setRecordLabel = props.setRecordLabel;
  const setLabelNumber = props.setLabelNumber;

  const changeTitle = (event) => {
    setTitle(event.target.value);
  }

  const changeRecordLabel = (event) => {
    setRecordLabel(event.target.value);
  };

  const changeLabelNumber = (event) => {
    setLabelNumber(event.target.value);
  };

  const disabled = props.disabled ? AlbumDetailsCSS.disabled : "";
  const readonly = props.disabled ? "readonly" : "";

  return (
    <div className={AlbumDetailsCSS.details}>
      <div className={AlbumDetailsCSS.headers}>
        <div>
          <p>Title</p>
        </div>
        <div>
          <p>Record Label</p>
        </div>
        <div>
          <p>Label Number</p>
        </div>
        <div>
          <p>Artists</p>
        </div>
        <div>
          <p>Tags</p>
        </div>
      </div>
      <div className={AlbumDetailsCSS.data}>
        <input
            type="text"
            value={title}
            onChange={changeTitle}
            className={disabled}
            readOnly = {readonly}
      ></input>
        <input
          type="text"
          value={recordLabel}
          onChange={changeRecordLabel}
          className={disabled}
          readOnly = {readonly}
        ></input>
        <input
          type="text"
          value={labelNumber}
          onChange={changeLabelNumber}
          className={disabled}
          readOnly = {readonly}
        ></input>
        <div>
          <p>{artists}</p>
        </div>
        <div>
          <p>{tags}</p>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;
/* 

                <div><p>{recordLabel}</p></div>
                <div><p>{labelNumber}</p></div>

*/
