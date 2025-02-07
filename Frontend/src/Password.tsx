// custom hook
import { useState } from "react";
function custom(){
  interface bg{
    backgroundImage: string
  };
  let [pass, setPass] = useState("password");
  let [eye, setEye] = useState<bg>({
    backgroundImage: `url("/images/view.png")`,
  });
  function toggle(){
    if(pass === "password"){
      setPass("text");
    }
    else if(pass === "text"){
      setPass("password");
    }
    if (eye.backgroundImage === `url("/images/hide.png")`) {
      setEye({backgroundImage: `url("/images/view.png")`});
    }
    else if(eye.backgroundImage === `url("/images/view.png")`){
      setEye({backgroundImage: `url("/images/hide.png")`});
    }
  }
  return { eye, pass, toggle } as { eye: bg, pass: string; toggle: () => void };
}
export {custom};
