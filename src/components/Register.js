import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, loginUser, get_follower, get_articles, get_avatar } from "../actions/action";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { url } from "./Landing";

import { MDBContainer, MDBCard, MDBBtn, MDBInput } from "mdb-react-ui-kit";

window.nextId = 10;

function Register() {
  const existedUsers = useSelector((state) => state.existedUsers);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function HandleRegisterSubmit(e) {
    e.preventDefault();

    if (
      name === "" ||
      username === "" ||
      email === "" ||
      phone === "" ||
      dob === "" ||
      zipcode === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill in all the fields");
    } else if (/^[a-z|A-Z]{1}[a-z|A-Z|0-9]*/.test(name) === false) {
      alert(
        "Username should start with a letter and only contain letters and numbers"
      );
    } else if (/.+@.+/.test(email) === false) {
      alert("Please enter a valid email address");
    } else if (/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(phone) === false) {
      alert("Please enter a valid phone number");
    } else if (/^[0-9]{5}$/.test(zipcode) === false) {
      alert("Please enter a valid zipcode");
    } else if (password !== confirmPassword) {
      alert("Password does not match");
    } else {
      fetch(url("register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          dob: dob,
          zipcode: zipcode,
          password: password,
          phone: phone,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.result === "success") {
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
                  dispatch(get_follower([]));
                  dispatch(get_articles([]));
                  dispatch(get_avatar(data.profile.avatar));
                  navigate("/main");
                }
              });
          } else {
            alert("Username already exists");
          }
        });
    }
  }

  return (
    <MDBContainer className="py-5 h-100">
      <MDBCard
        className="mb-3 h-800"
        style={{ borderRadius: ".5rem", background: "#f6d365" }}
      >
        <h2>Register</h2>
        <form className="register_form">
          <MDBInput
            style={{ background: "#d2c9d0" }}
            type="text"
            label="Account Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <MDBInput
            style={{ background: "#d2c9d0" }}
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <MDBInput
            style={{ background: "#d2c9d0" }}
            type="text"
            label="email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput
            style={{ background: "#d2c9d0" }}
            type="tel"
            label="phone e.g. 123-123-1234"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <MDBInput
            style={{ background: "#d2c9d0" }}
            type="date"
            label="birthday"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <MDBInput
            style={{ background: "#d2c9d0" }}
            type="text"
            label="zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />

          <MDBInput
            style={{ background: "#d2c9d0" }}
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <MDBInput
            style={{ background: "#d2c9d0" }}
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <MDBBtn color="secondary" onClick={HandleRegisterSubmit}>
            Register
          </MDBBtn>
        </form>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
