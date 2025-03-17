import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  let [Netflix, setNetflix] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    let text = "NETFLIX";
    // recursion
    // function animateText() {
    //   if (i < text.length) {
    //     setNetflix((prevData) => (prevData + text[i]))
    //     i++;
    //     setTimeout(animateText, 100);
    //   }
    // }
    async function animateText() {
      for (let s = 0; s < text.length; s++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            setNetflix((prevData) => prevData + text[s]);
            resolve("success");
          }, 150);
        });
      }
    }
    setTimeout(() => {
        navigate("/Netflix");
      }, 2000); // Small delay before navigating
    animateText();
  }, []);
  return (
    <div className="landing">
      <h1 className="logo">{Netflix}</h1>
    </div>
  );
}

export default Landing;
