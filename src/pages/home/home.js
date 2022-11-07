import React from "react";
import HomeCSS from "./home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className={HomeCSS.home}>
        <h1>Welcome back User! </h1>
        <h3>Quick links</h3>
        <div>
          <Link to="albums">
            <button>My Albums Library</button>
          </Link>
          <Link to="sets">
            <button>My Sets</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
