import React from "react";
import ItemCSS from "./Item.module.css";
import { Link } from "react-router-dom";

const Item = ({ myItem, page, is_song=false }) => {
  if (!is_song){
  return (
    <div className={ItemCSS.itemGrid}>
      <Link to={page + "/" + myItem._id}>
        <div>{myItem.title}</div>
      </Link>
    </div>
  );
  } else {
    return (
    <div className={ItemCSS.itemGrid}>
      <Link to={page + "/" + myItem.album_id}>
        <div>{myItem.title}</div>
      </Link>
    </div>
    );
  };
};

export default Item;
