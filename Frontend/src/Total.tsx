import Side from "./Side";
import Home from "./Home";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import session_manager from "./session.jsx";
import { createContext } from "react";

interface usernametype{
  username: string,
};

export let userContext = createContext<usernametype>({username: ""});

function Total() {
  let navigate = useNavigate();
  let [username, setUsername] = useState("");    
  useEffect(()=>{
    async function checkSession() {
      let checker = await session_manager();
      //console.log("session checker: ", checker);
      if(checker && checker.session === true)
      setUsername(checker.username);
      if(checker && checker.session === false){
        navigate('/');
      }
    }
    checkSession();
  },[]);
  
  return (
    <div
      style={{
        display: "flex",
        color: "rgb(172, 2, 2)",
        fontFamily: "arial",
        fontSize: "1.2rem",
        textShadow: "2px 2px 4px black",
      }}
    >
      <userContext.Provider value={{ username }}>
         <Side />
         <Home />
      </userContext.Provider>
    </div>
  );
}

export default Total;
