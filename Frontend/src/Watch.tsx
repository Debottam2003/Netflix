import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import session_manager from "./session.jsx";

const Watch = () => {
  useEffect(()=>{
    async function checkSession() {
      let checker = await session_manager();
      if(checker && checker.session === false){
        navigate('/');
      }
    }
    checkSession();
  },[]);
  let navigate = useNavigate();
  const location = useLocation();
  let link = location.state?.link;
  let [l, setLink] = useState("");

  useEffect(() => {
    if (link) {
      setLink(link);
    }
  }, [link]);

  let [home, setHome] = useState(false);

  const showHome = () => setHome(true);
  const hideHome = () => setHome(false);

  return (
    <div style={{ padding: "0", margin: "0" }}>
      <div
        className="watch-home"
        onMouseOver={showHome}
        onMouseOut={hideHome}
      >
        <div
          className="go-home"
          style={{
            display: home ? "flex" : "none",
            position: "absolute",
            left: "10px",
            top: "10px",
            padding: "20px",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => navigate("/home")}
        >
          {/* Home icon or text could go here */}
        </div>
      </div>
      {l ? (
        <ReactPlayer
          url={l}
          controls
          width="100%"
          height="100vh"
        />
      ) : (
        <div style={{color: "white"}}>Loading video...</div>
      )}
    </div>
  );
};

export default Watch;
