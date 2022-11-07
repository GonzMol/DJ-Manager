import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../../assets/images/logo.png";

export default function NavBar() {

  return (
    <div className={styles["nav-bar"]}>
      <div className={styles["logo-container"]}>
        <Link to ="/"><img src={logo} alt={"TEAM 72314"}></img></Link>
      </div>
      <div>
        <ul>
          <li>
            <Link to="albums">Album Library</Link>
          </li>
          <li>
            <Link to="sets">My Sets</Link>
          </li>
          <li>
            <Link to="search-song">Search Song</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
