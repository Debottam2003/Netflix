// custom hook
import { useState } from "react";
function custom(){
  interface bg{
    backgroundImage: string
  };
  let [pass, setPass] = useState("password");
  let [eye, setEye] = useState<bg>({
    backgroundImage: `url("../public/images/view.png")`,
  });
  function toggle(){
    if(pass === "password"){
      setPass("text");
    }
    else if(pass === "text"){
      setPass("password");
    }
    if (eye.backgroundImage === `url("../public/images/hide.png")`) {
      setEye({backgroundImage: `url("../public/images/view.png")`});
    }
    else if(eye.backgroundImage === `url("../public/images/view.png")`){
      setEye({backgroundImage: `url("../public/images/hide.png")`});
    }
  }
  return { eye, pass, toggle } as { eye: bg, pass: string; toggle: () => void };
}
export {custom};
