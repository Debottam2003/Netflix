import image from "./test_array";
import { useEffect, useState } from "react";
interface contentPropType {
  check: string;
}
function SeriesContent({ check }: contentPropType) {
  let [series_data, set_series_data] = useState([{
    id: 0,
    name: "",
    imagelink: "",
    link: "",
  }]);
  function start_series(){
    //hit the server for the particular series against the id of the series
  }

  useEffect(() => {
    async function get_series(){
      //hit the server to get the list of movies
      let movie = await fetch('http://localhost:5000/api/home');
      let data = await movie.json();
      //console.log("series: ", data);
    }  
    get_series();
  }, []);
  return (
    <div
      className="cards"
      style={{
        display: check === "Series" ? "flex" : "none",
        flexFlow: "wrap",
      }}
    >
      {image?.map((element, index) => {
        return (
          <div
            style={{ display: "flex", flexDirection: "column" }}
            className="series-card"
            key={index}
          >
            <img src={element} alt="cards-image" />
            <button className="watch" onClick={start_series}>Coming Soon</button>
          </div>
        );
      })}
    </div>
  );
}

export default SeriesContent;
