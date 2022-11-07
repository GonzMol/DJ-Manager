import { useState } from "react";
import Select from "react-select";
import styles from "./AddSongListBar.module.css";

/* Search Bar component */
const AddSongListBar = ({options, songs, addSongToList}) => {
  // setting up options from drop down menu
  const myOptions = options.map((details) => {
    return {
      label: details.title + " - " + details.artists[0],
      value: details,
    };
  });
  // state for the search bar
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    if (!selectedOption) return;
    if (checkIfSongExistsAlready(selectedOption.value)) {
      alert("A song can only be added once to a dj set!")
    } else {
      addSongToList(selectedOption.value);
    }
    setSelectedOption("");
  };

  const checkIfSongExistsAlready = (song) => {
    let matchId = false;
    for (let i = 0; i < songs.length; i++) {
      matchId = songs[i]._id === song._id;
      if (matchId) return matchId;
    }
    return matchId;
  };

  const optionStyles = {
    option: (provided, state) => ({
      backgroundColor: "var(--sky-blue)",
      color: "var(--navy-blue)",
      margin: "5px 20px 5px 20px",
      borderRadius: "8px",
      height: "25px",
      paddingTop: "5px",
      width: "360px",
      cursor: "pointer",
      transition: "filter .1s, transform .2s",
      "&:hover": {
        filter: "brightness(110%)",
        transform: "scale(105%)"
      }
    }),

    menu: (provided, state) => ({
      backgroundColor: "var(--dark-blue)",
      zIndex: 5,
      position: "absolute",
      width: "400px",
      borderRadius: "12px",
    }),

    menuList: () => ({
      height: "200px",
      "overflow-y": "auto",
      "overflow-x": "hidden",
      "::-webkit-scrollbar": {
        width: "10px"
      },
    
      "::-webkit-scrollbar-track": {
        backgroundColor: "var(--navy-blue)",
        borderRadius: "5px"
      },
    
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "var(--sky-blue)",
        borderRadius: "5px"
      }
    }),

    control: () => ({
      backgroundColor: "var(--sky-blue)",
      height: "51px",
      borderRadius: "12px",
      padding: "2px",
      "&:hover": {
        filter: "brightness(110%)"
      },
    }),

    input: () => ({
      color: "var(--navy-blue)",
      marginTop: "6px"
    }),

    noOptionsMessage: () => ({
      color: "var(--sky-blue)",
      fontSize: "18px",
      margin: "10px"
    }),

    loadingMessage: () => ({
      color: "var(--sky-blue)",
      fontSize: "18px",
      margin: "10px"
    }),

    placeholder: () => ({
      color: "var(--navy-blue)",
      marginLeft: "168px",
      marginTop: "6px",
      position: "absolute"
    }),

    singleValue: () => ({
      color: "var(--navy-blue)",
      position: "absolute",
      margin: "6px auto 0px auto",
      left: 0,
      right: 0,
      textAlign: "center"
    }),

    dropdownIndicator: () => ({
      position: "relative",
      "z-index": -100,
      color: "var(--navy-blue)",
      top: "10px"
    })
  }

  

  return (
    <div className = {styles["container-container"]}>
      <div className={styles["search-bar-container"]}>
        <Select
          onChange={setSelectedOption}
          styles = {optionStyles}
          options={myOptions}
          className={styles["search-bar"]}
          openMenuOnClick={true}
          placeholder="Search..."
          value={selectedOption}
          maxMenuHeight={150}
        />
        <button onClick={handleClick} className={styles["search-button"]}>
          ADD
        </button>
      </div>
      <div className = {styles["cover"]}></div>
    </div>
  );
};
export default AddSongListBar;
