import User from "./User"
import { useState } from "react"
function Side() {
let [show, setShow] = useState<boolean>(false);
function showProfile(){
  if(!show){
    setShow(true);
  }
  else{
    setShow(false);
  }
}

  return (
    <div className="sidebar">
        <div className="side">
          <div>
            <div className="profile" onClick={showProfile} title="Profile">
              <User usershow = {show} />
            </div>
          </div>
            <img src="../images/search.png" alt="search-icon" title="Search" ></img>
            <img src="../images/home.png" alt="search-icon" title="Home" ></img>
            <img src="../images/plus.png" alt="search-icon" title="Watching" ></img>
        </div>
    </div>
  )
}

export default Side