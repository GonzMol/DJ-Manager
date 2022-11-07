import useAxios from "../../api/useAxios";
import axios from "../../api/api";
import SearchSongCSS from "./search-song.module.css";
import ItemGrid from "../../components/ItemGrid/ItemGrid";
import { useState } from "react";

export default function SearchSongs() {
  const { response, error, loading } = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "songs/search",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const songs = response?.data;
  const backendErrors = response?.errors;
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
      <h1 className={SearchSongCSS.gridTitle}>Song Library</h1>
      <input
        type="text"
        className={SearchSongCSS.searchBar}
        placeholder="Search..."
        size="30"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div>
        {(
          <ItemGrid
            items={songs ? songs.filter((songs) =>
              (
                songs.title.toLowerCase() + songs.artists.join().toLowerCase()
              ).includes(searchTerm.toLowerCase())
            ) : []}
            baseDir="../view-album"
            is_song={true}
            response = {response}
            loading = {loading}
          />
        )}
      </div>
    </>
  );
}
