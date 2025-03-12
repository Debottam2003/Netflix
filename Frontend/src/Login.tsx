import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import session_manager from "./session.jsx";
import { custom } from "./Password.js";

function Login() {
  let [error, setError] = useState("");
  interface bg{
    backgroundImage: string
  };
  let { eye, pass, toggle }: { eye: bg, pass: string, toggle: () => void } = custom();
  function password_toggle(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    toggle();
  }
  let navigate = useNavigate();
  useEffect(() => {
    async function checkSession() {
      let checker = await session_manager();
      //console.log(checker);
      if (checker && checker.session === true && checker.username !== "") {
        navigate("/home");
      }
    }
    checkSession();
  }, []);

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function submitForm(data: any) {
    let { email, password } = data;
    //console.log(data, {email, password});
    try {
      let response = await axios.post("http://localhost:5000/api/login/", {
        email,
        password,
      });
      //console.log(response.status, response.statusText, response.data);
      let time = Date.now() + 1000 * 60 * 5;
      let session_obj = { jwt_token: response.data.token, expiry: time };
      //console.log(session_obj);
      //console.log(response);
      if (response.status === 200 && response.statusText === "OK") {
        console.log("all ok");
        localStorage.setItem("token", JSON.stringify(session_obj));
        navigate("/home");
      } else {
        setError("Invalid email or password");
      }
    } catch (e) {
      setError("Invalid email or password");
    }
  }
  return (
    <div className="login">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit(submitForm)}>
        <input type="email" placeholder="Email" {...register("email")} />
        <div className="password">
          <input
          className="pass"
            type= {pass}
            placeholder="password"
            {...register("password")}
          />
          <button className="hide" style={eye} onClick={(event)=>password_toggle(event)}></button>
        </div>
        <button type="submit" className="btn">
          Sign In
        </button>
      </form>
      {error !== "" && <h4 style={{ color: "red" }}>{error}</h4>}
      <Link to="/Netflix/register" style={{ textDecoration: "none", color: "aliceblue" }}>
        <h4>Sign Up Now</h4>
      </Link>
    </div>
  );
}

export default Login;
