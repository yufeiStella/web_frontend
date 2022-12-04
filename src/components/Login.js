import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, get_follower, get_articles, get_avatar } from "../actions/action";
import { invalidLogin } from "../actions/action";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MDBContainer, MDBCard, MDBBtn, MDBInput } from "mdb-react-ui-kit";

import { url } from "./Landing";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const existedUsers = useSelector((state) => state.existedUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let followers = [];

  function HandleLoginSubmit(e) {
    e.preventDefault();
    console.log("login submit");
    console.log(username);
    console.log(password);
    fetch(url("login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success") {
          dispatch(loginUser(username, password));
          dispatch(get_follower(data.profile.following));
          dispatch(get_avatar(data.profile.avatar));
          fetch(url("articlesByAuthor"), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              dispatch(get_articles(data.articles));
              navigate("/main");
            });
        } else {
          console.log("fail");
          alert("Login failed");
          //dispatch(invalidLogin());
        }
      });
  }

  return (
    <MDBContainer className="py-5 h-100">
      <MDBCard
        className="mb-3 h-800"
        style={{ borderRadius: ".5rem", background: "#f6d365" }}
      >
        <h2>Login</h2>
        <form className="login_form">
          <MDBInput
            style={{ background: "#d2c9d0" }}
            type="text"
            label="Account name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <MDBInput
            style={{ background: "#d2c9d0" }}
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <MDBBtn onClick={HandleLoginSubmit} color="secondary">
            Login
          </MDBBtn>
        </form>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
