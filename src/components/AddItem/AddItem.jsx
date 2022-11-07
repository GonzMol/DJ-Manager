import React from "react";
import { Link } from "react-router-dom";
import AddItemCSS from "./AddItem.module.css";

const AddItem = (props) => {
  return (
    <Link to={props.link} className={AddItemCSS.linkItem}>
      <button className={AddItemCSS.addItem}>Add {props.title}</button>
    </Link>
  );
};

export default AddItem;
