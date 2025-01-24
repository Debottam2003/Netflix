import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface contentPropType {
  check: string;
}
function MovieContent({ check }: contentPropType) {
  let [movie_data, set_movie_data] = useState([{
    id: 0,
    name: "",
    imagelink: "",
    link: "",
  }]);
  let navigate = useNavigate();
  async function start_movie(id:number){
    //hit the server for the particular movie against the id of the movie
    //console.log("movie id: ", id);
    let response = await axios.post('http://localhost:5000/api/movie', {id});
    //console.log(response);
    //console.log("response: ", response.data[0].link);
    if(response.status === 200 && response.data[0].link !== "" && response.statusText === "OK"){
      navigate("/watch",{state: {link: response.data[0].link}});
    }
  }
useEffect(() => {
  async function get_movie(){
    //hit the server to get the list of movies
    let movie = await fetch('http://localhost:5000/api/home');
    //console.log(movie);
    let data = await movie.json();
    //console.log("movies: " ,data);
    set_movie_data([...data.movies]);  
  } 
  get_movie();
}, []);

  return (
    <div
      className="cards"
      style={{
        display: check === "Movies" ? "flex" : "none",
        flexFlow: "wrap",
      }}
    >
      {movie_data?.map((element, index) => {
        return (
          <div
            style={{ display: "flex", flexDirection: "column" }}
            className="movie-card"
            key={index}
          >
            <img src= {element.imagelink} alt="nothing to show" />
            <button className="watch"  onClick={()=>{start_movie(element.id)}}>Watch Now</button>
          </div>
        );
      })}
    </div>
  );
}

export default MovieContent;
