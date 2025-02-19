import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import session_manager from "./session.jsx";
import { custom } from "./Password.tsx";

function Register() {
  let [error, setError] = useState("");
  interface bg{
    backgroundImage: string
  };
  let { eye, pass, toggle }: { eye: bg, pass: string; toggle: () => void } = custom();
  function password_toggle(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    toggle();
  }
  let navigate = useNavigate();
  useEffect(() => {
    async function checkSession() {
      let checker = await session_manager();
      console.log(checker);
      if (checker && checker.session === true) {
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
    let { username, email, password } = data;
    //console.log(data);
    try {
      let response = await axios.post("http://localhost:5000/api/register/", {
        username,
        email,
        password,
      });
      console.log(response.status, response.statusText);
      let time = Date.now() + 1000 * 60 * 2;
      if (response.status === 200 && response.statusText === "OK") {
        let session_obj = { jwt_token: response.data.token, expiry: time };
        //console.log(session_obj);
        localStorage.setItem("token", JSON.stringify(session_obj));
        navigate("/home");
      } else {
        setError("User with same email already exists");
      }
    } catch (e) {
      setError("User with same email already exists");
    }
  }
  return (
    <div className="register">
      <h1>Create Account</h1>
      <form className="register-form" onSubmit={handleSubmit(submitForm)}>
        <input
          type="text"
          placeholder="Username"
          {...register("username")}
          required
        />
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          required
        />
        <div className="password">
          <input
            className="pass"
            type={pass}
            placeholder="password"
            {...register("password")}
          />
          <button
            className="hide"
            style={eye}
            onClick={(event) => password_toggle(event)}
          ></button>
        </div>
        <button type="submit" className="btn">
          Sign Up
        </button>
      </form>
      {error !== "" && <h4 style={{ color: "red" }}>{error}</h4>}
      <Link to="/Netflix" style={{ textDecoration: "none", color: "aliceblue" }}>
        <h4>Sign In</h4>
      </Link>
    </div>
  );
}

export default Register;
