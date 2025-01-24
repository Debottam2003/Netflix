import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "./Total";
import { useContext } from "react";

type usershowType= {
  usershow: boolean;
}

interface usernametype{
  username: string,
};

function User({usershow}: usershowType) {
  let navigate = useNavigate();
  async function logout(){
    let sure = window.confirm("Are you sure?");
    if(sure){
    let localStorageData:string | null = localStorage.getItem("token");
    let session_ob = JSON.parse(localStorageData || "{}");
    let jwt_token = session_ob.jwt_token;
    //console.log(jwt_token);
    let response = await axios.delete("http://localhost:5000/api/logout", {
      headers: {
       token: jwt_token
      }
    });
    //console.log(response.data);
    if(response.status === 200 && response.statusText === "OK"){
    localStorage.removeItem("token");
    }
    else{
      alert("something went wrong");
    }
    navigate('/');
  }
  }
    let {username} = useContext<usernametype>(userContext);//use of context api
    //console.log("username: ", username);
  return (
    <div className="user" style={{display: usershow ? "flex" : "none"}}>
            <div className="usericon"></div>
            <div className="username">{username}</div>
            <button className="log-out" onClick={logout}>Log Out</button>
    </div>
  )
}

export default User