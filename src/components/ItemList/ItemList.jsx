import React from "react";
import ItemListCSS from "./ItemList.module.css";

const ItemList = (props) => {
    const items = props.items
    const setItems = props.setItems;
    const addButtonText = props.addButtonText;

    const deleteItem = item => {
        setItems(items.filter(x => x !== item));
    };

    return (
        
        <div className = {ItemListCSS.itemContainer}>
            <div className = {ItemListCSS.name}>{addButtonText}</div>
            <div className = {ItemListCSS.items}>
                {items.map((item) => {
                    return <div key={item} onClick = {function() { deleteItem(item) }}>{item}</div>
                })}
            </div>
        </div>
        
    );
}

export default ItemList;