import ItemGrid from "../../components/ItemGrid/ItemGrid";
import AddItem from "../../components/AddItem/AddItem";
import GridDisplayCSS from "./albumLibrary.module.css";
import useAxios from "../../api/useAxios";
import axios from "../../api/api";
import { useState } from "react";

export default function AlbumLibrary() {
  const { response, error, loading } = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "album-details",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const albums = response?.data;
  const backendErrors = response ? response?.errors : null;
  const success = response?.success;

  if (error) {
    console.log("Error: " + error.message);
  }

  if (!success && backendErrors) {
    for (let i = 0; i < backendErrors.length; i++) {
      console.log("Backend Error: " + backendErrors[i].msg);
    }
  }

  return (
    <>
      <h1 className={GridDisplayCSS.gridTitle}>Albums Library</h1>
      <input
        type="text"
        className={GridDisplayCSS.searchBar}
        placeholder="Search..."
        size="30"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div>
        {(
          <ItemGrid
            items={albums ? albums.filter((album) =>
              album.title.toLowerCase().includes(searchTerm.toLowerCase()) 
              || (album.tags.filter(tag => tag.toLowerCase() === searchTerm.toLowerCase())).length > 0
            ) : []}
            baseDir="../view-album"
            response = {response}
            loading = {loading}
          />
        )}
        <AddItem title={"Album"} link={"/add-album"} />
      </div>
    </>
  );
}
