import React from "react";
import Register from "./Register";
import Login from "./Login";

// export function url(path) {
//   return "http://localhost:5000/" + path;
// }

export function url(path) {
  return "https://yufeizhanghw7.herokuapp.com/" + path;
}

function Landing() {
  return (
    <div className="landing">
      <Register />
      <Login />
    </div>
  );
}

export default Landing;
