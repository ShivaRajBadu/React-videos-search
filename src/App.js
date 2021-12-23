import { useState } from "react";
import axios from "axios";

import "./App.css";
function App() {
  const [query, setQuery] = useState("");
  const [data, setdata] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    getVideos();
    console.log("sumbitted");
  };
  const getVideos = () => {
    axios
      .get(
        `https://api.pexels.com/videos/search?query=${query}&per_page=20&page=1`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization:
              "563492ad6f91700001000001333ea881bb4c4ae39d9ce4515363bac9",
          },
        }
      )
      .then((response) => setdata(response.data.videos));
  };
  return (
    <div className="container">
      <div className="header">
        <h1 className="title">React videos search</h1>
      </div>
      <form onSubmit={handleSubmit} className="search">
        <p>search like dog, ocean, nature etc..</p>
        <input
          placeholder="Videos search..."
          className="input-field"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button type="submit" className="button">
          search...
        </button>
      </form>
      <div className="show-videos">
        {data.map((video) => (
          <div key={video.id} className="card">
            <video className="video" controls src={video.video_files[0].link}>
              video might have a problems
            </video>

            <div className="user-details">
              <h3 className="user-name">By: {video.user.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
