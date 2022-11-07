import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import SetsLibrary from "./pages/sets-library/sets-library";
import Home from "./pages/home/home";
import Error from "./pages/error/error";
import AlbumLibrary from "./pages/album-library/album-library";
import ViewAlbum from "./pages/view-album/view-album";
import AddAlbum from "./pages/new-album/new-album";
import ViewSet from "./pages/view-set/view-set";
import NewSet from "./pages/new-set/new-set";
import SearchSongs from "./pages/search-song/search-song";

function App() {
  // make sure to put things within Router tag to be able to access the routes.
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="albums" element={<AlbumLibrary />} />
          <Route exact path="sets" element={<SetsLibrary />} />
          <Route exact path="view-album/:id" element={<ViewAlbum />} />
          <Route exact path="add-album" element={<AddAlbum />} />
          <Route exact path="view-set/:id" element={<ViewSet />} />
          <Route exact path="new-set" element={<NewSet />} />
          <Route exact path="search-song" element={<SearchSongs />} />
          <Route exact path="error" element={<Error />} />
          <Route exact path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

/* 

          <Route exact path="view-album" element={<ViewAlbum />} />


*/
