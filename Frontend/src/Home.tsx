import { useState } from "react";
import MovieContent from "./MovieContent";
import SeriesContent from "./SeriesContent";

function Home() {
  let [contenttype, setContentType] = useState("Movies");
  function movie_content() {
    console.log("button clicked");
    if (contenttype === "Series") {
      setContentType("Movies");
    } else if (contenttype === "Movies") {
      return;
    }
  }
  function series_content() {
    console.log("button clicked");
    if (contenttype === "Movies") {
      setContentType("Series");
    } else if (contenttype === "Series") {
      return;
    }
  }
  return (
    <div className="home">
      <div
        style={{
          position: "relative",
          top: "2px",
          left: "110px",
          padding: "0px",
          margin: "0px",
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <h1>Netflix</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button className="movies" onClick={movie_content}>
            Movies
          </button>
          <button className="series" onClick={series_content}>
            Series
          </button>
        </div>
      </div>
      <div
        style={{
          position: "relative",
          top: "2px",
          left: "110px",
          width: "90%",
          marginBottom: "25px",
        }}
      >
        <MovieContent check={contenttype} />
        <SeriesContent check={contenttype} />
      </div>
    </div>
  );
}

export default Home;
