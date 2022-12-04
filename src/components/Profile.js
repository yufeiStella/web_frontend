import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import profile_photo from "../assets/profile_current_photo.jpg";
import { useSelector } from "react-redux";
import { url } from "./Landing";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import "../styles/Profile.css";
import { get_email, get_zipcode, get_phone, get_avatar } from "../actions/action";

function Profile() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  //const existedUsers = useSelector((state) => state.existedUsers);
  //const newUser = useSelector((state) => state.newUsers);

  const imageInputRef = useRef(null);
  //console.log(loggedInUser);
  let username = loggedInUser.username;
  fetch(url("email/?user=${username}"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      dispatch(get_email(data.email));
    });

  let email = useSelector((state) => state.email);

  fetch(url("phone/?user=${username}"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      dispatch(get_phone(data.phone));
    });

  let phone = useSelector((state) => state.phone);

  fetch(url("zipcode/?user=${username}"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      dispatch(get_zipcode(data.zipcode));
    });

  let zipcode = useSelector((state) => state.zipcode);

  let avatar = useSelector((state) => state.avatar);

  let password = loggedInUser.password;

  console.log("email is " + email);
  //console.log("zipcode is " + zipcode);

  let new_email = "";
  let new_phone = "";
  let new_zipcode = "";
  let new_password = "";

  const [avatarUrl, setAvatarUrl] = useState(avatar);

  console.log("avatarUrl is " + avatarUrl);


  function HandleUploadNewPicture(e) {
    e.preventDefault();
    //console.log("upload new picture");
    imageInputRef.current.click();
  }

  const handleFileChange = (e) => {
    // const imagefile = event.target.files && event.target.files[0];
    // if (!imagefile) {
    //   return;
    // }
    e.preventDefault();
    const file = e.target.files[0];
    const fd = new FormData()
    fd.append('image', file)
    fetch(url('uploadAvatar'), {
      method: "PUT",
      credentials: "include",
      body: fd,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        let new_avatar = data.url;
        fetch(url("avatar"), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            avatar: new_avatar,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch(get_avatar(data.avatar));
            setAvatarUrl(data.avatar);
          }
          );
      }
    );
  };

  function HandleEditSubmit(e) {
    e.preventDefault();
    //console.log("edit");
    new_email = document.getElementById("edit_email").value;
    new_phone = document.getElementById("edit_phone").value;
    new_zipcode = document.getElementById("edit_zipcode").value;
    new_password = document.getElementById("edit_password").value;

    if (new_email !== "" && new_email !== email) {
      //console.log(new_email);
      email = new_email;
      document.getElementById("update_email").innerHTML = "Email: " + email;
      fetch(url("email/?user=${username}"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: new_email,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
    if (new_phone !== "" && new_phone !== phone) {
      //console.log(new_phone);
      phone = new_phone;
      document.getElementById("update_phone").innerHTML = "Phone: " + phone;
      fetch(url("phone/?user=${username}"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          phone: new_phone,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
    if (new_zipcode !== "" && new_zipcode !== zipcode) {
      //console.log(new_zipcode);
      zipcode = new_zipcode;
      document.getElementById("update_zipcode").innerHTML =
        "Zipcode: " + zipcode;
      fetch(url("zipcode/?user=${username}"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          zipcode: new_zipcode,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
    if (new_password !== "" && new_password !== password) {
      //console.log("new_password "+new_password);
      password = new_password;

      document.getElementById("update_password").innerHTML =
        "Password: " + "*".repeat(password.length);

      fetch(url("password/?user=${username}"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          password: new_password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        }
      );
    }

  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <MDBContainer className="py-5 h-100">
        <Link to="/main"> Back to Main Page </Link>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    height: "650px",
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <MDBCardImage
                    src={avatarUrl}
                    alt="Avatar"
                    className="my-5 mx-auto d-block"
                    style={{ width: "80px" }}
                    fluid
                  />
                  <input
                    style={{ display: "none" }}
                    ref={imageInputRef}
                    type="file"
                    onChange={handleFileChange}
                  />
                  <MDBBtn color="secondary" onClick={HandleUploadNewPicture}>
                    Upload new picture
                  </MDBBtn>
                  <br />
                  <br />
                  <br />

                  <MDBTypography tag="h2">Current Info</MDBTypography>
                  <MDBCardText id="update_username">
                    Username: {username}
                  </MDBCardText>
                  <MDBCardText id="update_email">Email: {email}</MDBCardText>
                  <MDBCardText id="update_phone">Phone: {phone}</MDBCardText>
                  <MDBCardText id="update_zipcode">
                    Zipcode: {zipcode}
                  </MDBCardText>
                  <MDBCardText id="update_password">
                    Password: {"*".repeat(password.length)}
                  </MDBCardText>
                  <br />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Edit Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <form onSubmit={HandleEditSubmit}>
                      <MDBInput label="Email" id="edit_email" />
                      <br />
                      <MDBInput label="Phone" id="edit_phone" />
                      <br />
                      <MDBInput label="Zipcode" id="edit_zipcode" />
                      <br />
                      <MDBInput
                        label="Password"
                        id="edit_password"
                        type="password"
                      />
                      <br />
                      <MDBBtn color="secondary">Update Changes</MDBBtn>
                    </form>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

export default Profile;
