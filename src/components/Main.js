import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import profile_photo from "../assets/profile_current_photo.jpg";
import { useSelector } from "react-redux";
import { url } from "./Landing";

import { get_articles, get_headline } from "../actions/action";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  //MDBCardBody,
  MDBCardImage,
  //MDBTypography,
  MDBBtn,
  //MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import {
  add_follower,
  add_follower_articles,
  remove_follower,
  remove_follower_articles,
  searchPosts,
  update_headline,
} from "../actions/action";
//import { addFollower, afterRemoveFollower } from "../actions/action";

window.total_post_id = 100;

function Main() {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const followers = useSelector((state) => state.followers);
  // let loggedInUserPosts = useSelector((state) => state.loggedInUserPosts);
  // let followers = useSelector((state) => state.followers);
  // let user_posts = useSelector((state) => state.loggedInUserPosts);
  // const existedUsers = useSelector((state) => state.existedUsers);
  // const newUser = useSelector((state) => state.newUsers);
  const posts = useSelector((state) => state.posts);
  let avatar = useSelector((state) => state.avatar);
  let post_date = new Date();
  //console.log(posts);
  console.log("followers is " + followers);

  const imageInputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let username = loggedInUser.username;

  fetch(url("headline/?user=${username}"), {
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
      dispatch(get_headline(data.headline));
    });

  let status_headline = useSelector((state) => state.headline);

  let user_posts = [];

  let phone = "";
  let zipcode = "";
  let user_id = -1;
  //let followers = [];
  //let user_posts = [];

  //console.log("remain :" + remainingFollowers);

  // if (loggedInUser) {
  //   let who_login = existedUsers.find(
  //     (user) => user.username === loggedInUser.username
  //   );
  //   //console.log(who_login);
  //   username = who_login.username;
  //   email = who_login.email;
  //   phone = who_login.phone;
  //   zipcode = who_login.address.zipcode;
  //   status_headline = who_login.company.catchPhrase;
  //   user_id = who_login.id;

  // } else if (newUser) {
  //   username = newUser.username;
  //   email = newUser.email;
  //   phone = newUser.phoneNumber;
  //   zipcode = newUser.zipcode;
  //   user_id = newUser.id;
  //   status_headline = "I am new here";

  //followers = [];
  //console.log("hay" + followers);
  // followers = existedUsers.filter((user) => user.id === (user_id + 1) % 10);
  //console.log(followers);
  // }
  const [followersList, setFollowersList] = useState(followers);
  const [newFollowerName, setNewFollowerName] = useState("");
  const [postsList, setPostsList] = useState(posts);
  const [totalPosts, setTotalPosts] = useState(posts);
  const [newPost, setNewPost] = useState("");
  const [postSearched, setPostSearched] = useState("");
  const [newStatusHeadline, setNewStatusHeadline] = useState("status_headline");
  //console.log("followersList: name " + followersList.filter((user) => user.id === user_id+1)[0].username);
  // postsList.map((post) => (
  //   //console.log(post)
  //   console.log(followersList.filter((user) => user.id === post.userId)[0]?.username)
  // ));

  function HandleLogout() {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  }

  function HandleUnfollow(e) {
    e.preventDefault();
    let x = e.target.value;
    console.log("unfollow " + x);
    setFollowersList(followersList.filter((follower) => follower !== x));
    console.log("unfollow " + x);
    console.log("followersList: " + followersList);
    let new_followers = followersList.filter((follower) => follower !== x);
    setPostsList(postsList.filter((post) => post.author !== x));
    setTotalPosts(totalPosts.filter((post) => post.author !== x));
    let new_posts = postsList.filter((post) => post.author !== x);
    dispatch(remove_follower(new_followers, new_posts));
    fetch(url("following/" + x), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  function HandleAddNewFollower(e) {
    e.preventDefault();
    if (newFollowerName === "") {
      alert("Please enter a valid username");
      return;
    }
    fetch(url("following/" + newFollowerName), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.following) {
          setFollowersList(data.following);
          let new_followers = followersList.concat([newFollowerName]);
          dispatch(add_follower(new_followers));
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
              setPostsList(data.articles);
              setTotalPosts(data.articles);
            });
        } else {
          alert("Please enter a valid username");
        }
      });
  }

  function HandleAddNewPost() {
    if (newPost === "") {
      alert("Please enter a valid post");
      return;
    }
    fetch(url("article"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        text: newPost,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(url("articles/"), {
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
            setPostsList(data.articles);
            setTotalPosts(data.articles);
          });
      });

  }

  function HandleCancelText() {
    document.getElementById("add_post").value = "";
    setNewPost("");
  }

  function HandleSearchPost() {
    console.log("postSearched: " + postSearched);
    console.log("where we search: postsList: " + postsList);
    if (postSearched !== "") {
      const author = followersList.filter(
        (follower) => follower === postSearched
      );
      console.log("author: " + author);
      if (postSearched === username) {
        console.log("searched_posts is username");
        setPostsList(totalPosts.filter((post) => post.author === username));
      } else if (author.length > 0) {
        console.log("searched_posts is other user: " + author);
        setPostsList(totalPosts.filter((post) => post.author.includes(author)));
      } else {
        let searched_posts = totalPosts.filter(
          (post) =>
          post.text.includes(postSearched)
        )
        console.log("searched_posts: " + searched_posts);
        setPostsList(searched_posts);
      }
    }
    if (postSearched === "") {
      setPostsList(totalPosts);
    }
  }

  function HandleAddImage(e) {
    e.preventDefault();
    //console.log("upload new picture");
    imageInputRef.current.click();
  }

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const fd = new FormData()
    fd.append('image', file)
    fetch(url('uploadAvatar'), {
      method: "PUT",
      credentials: "include",
      body: fd,
    })
  };

  function HandleNewStatusHeadline(e) {
    e.preventDefault();
    if (newStatusHeadline !== "") {
      document.getElementById("status_headline").innerHTML =
        "Status Headline: " + newStatusHeadline;
    }

    fetch(url("headline/?user=${username}"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        headline: newStatusHeadline,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  function ShowAndHideComments(post_id) {
    //console.log("post_id: " + post_id);
    let comments = document.getElementById("comments_"+post_id);
    //console.log("comments: " + comments.innerHTML);
    //console.log("comments: " + comments.value);
    if (comments.style.display === "block") {
      comments.style.display = "none";
    } else {
      comments.style.display = "block";
    }
  }

  function HandleEditArticle(post_id) {
    let old_text = document.getElementById("text_"+post_id).value;
    let new_text = document.getElementById("edit_article_"+post_id).value;
    if (new_text !== "" && new_text !== old_text) {
      //we need to update the article
      fetch(url("articles/" + post_id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          text: new_text,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
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
              setPostsList(data.articles);
              setTotalPosts(data.articles);
            });
        }
        );
    } 
  }

  return (
    <MDBContainer className="py-5 h-100">
      {/* <MDBRow className="justify-content-center align-items-center h-100"> */}
      <MDBRow className="justify-content-center ">
        <MDBCol lg="6" className="mb-4 mb-lg-0">
          <MDBRow className="g-0">
            <h2>Info Area</h2>
            <MDBCard
              className="mb-3 h-800"
              style={{ borderRadius: ".5rem", background: "#f6d365" }}
            >
              <MDBRow>
                <MDBCol md="4">
                  <MDBBtn color="secondary" onClick={HandleLogout}>
                    Log Out
                  </MDBBtn>
                </MDBCol>
                <MDBCol md="4">
                  <MDBBtn
                    color="secondary"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
              <MDBCardImage
                className="my-5 mx-auto d-block"
                src={avatar}
                alt="Avatar"
                style={{ width: "200px", borderRadius: "5%" }}
                fluid
              />

              <MDBCardText>Username: {username}</MDBCardText>
              <MDBCardText id="status_headline">
                Status Headline: {status_headline}
              </MDBCardText>
              <MDBInput
                label="Update status headline"
                style={{ background: "#d2c9d0" }}
                onChange={(e) => setNewStatusHeadline(e.target.value)}
              ></MDBInput>
              <MDBBtn color="secondary" onClick={HandleNewStatusHeadline}>
                Update
              </MDBBtn>
            </MDBCard>
          </MDBRow>
          <MDBRow className="g-0">
            <h2>Followers Area</h2>
            <MDBInput
              label="Add new follower"
              style={{ background: "#d2c9d0" }}
              onChange={(e) => setNewFollowerName(e.target.value)}
            ></MDBInput>
            <MDBBtn color="secondary" onClick={HandleAddNewFollower}>
              Add
            </MDBBtn>
            <MDBCard
              className="mb-3 h-800"
              style={{ borderRadius: ".5rem", background: "#f6d365" }}
            >
              <MDBRow className="g-0">
                {React.Children.toArray(
                  followersList.map((user) => (
                    <MDBCol>
                      <MDBCardImage
                        className="my-5 mx-auto d-block"
                        src={profile_photo}
                        alt="Avatar"
                        style={{ width: "100px", borderRadius: "5%" }}
                        fluid
                      />
                      <MDBCardText>Username: {user}</MDBCardText>
                      <MDBCardText>Headline: Hello!</MDBCardText>
                      <MDBBtn
                        color="secondary"
                        value={user}
                        onClick={HandleUnfollow}
                      >
                        Unfollow
                      </MDBBtn>
                    </MDBCol>
                  ))
                )}
              </MDBRow>
            </MDBCard>
          </MDBRow>
        </MDBCol>
        <MDBCol lg="6" className="mb-4 mb-lg-0">
          <MDBRow className="g-0">
            <h2>Add image and new post here</h2>
            <input
              style={{ display: "none" }}
              ref={imageInputRef}
              type="file"
              onChange={handleFileChange}
            />
            <MDBBtn
              className="mx-auto"
              color="secondary"
              onClick={HandleAddImage}
            >
              Add image
            </MDBBtn>
            <MDBInput
              label="Add new post"
              style={{ background: "#d2c9d0", height: "100px" }}
              id="add_post"
              onChange={(e) => setNewPost(e.target.value)}
            ></MDBInput>
            <MDBRow>
              <MDBCol md="6">
                <MDBBtn color="secondary" onClick={HandleAddNewPost}>
                  Add
                </MDBBtn>
              </MDBCol>
              <MDBCol md="6">
                <MDBBtn color="secondary" onClick={HandleCancelText}>
                  Cancel
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </MDBRow>
          <MDBRow className="g-0">
            <h2>Posts and Search Area</h2>
            <MDBInput
              label="Search post by author and text here"
              style={{ background: "#d2c9d0", height: "100px" }}
              onChange={(e) => setPostSearched(e.target.value)}
            ></MDBInput>
            <MDBBtn color="secondary" onClick={HandleSearchPost}>
              Search
            </MDBBtn>
            <MDBCard
              className="mb-3 h-800"
              style={{ borderRadius: ".5rem", background: "#f6d365" }}
            >
              <MDBRow className="g-0">
                {React.Children.toArray(
                  postsList.map((post) => (
                    <MDBCol>
                      <MDBCardImage
                        className="my-5 mx-auto d-block"
                        src={profile_photo}
                        alt="Avatar"
                        style={{ width: "100px", borderRadius: "5%" }}
                        fluid
                      />

                      <MDBCardText>
                        Author: {post.author}
                      </MDBCardText>

                      <MDBCardText>
                        Time:{" "}
                        {post.date}
                      </MDBCardText>
                      <MDBCardText>Title: {post.author+post.pid}</MDBCardText>
                      <MDBCardText id={"text_" + post.pid}>{post.text}</MDBCardText>
                      <MDBInput label="Edit" id={"edit_article_"+post.pid} />
                      <MDBBtn color="secondary" onClick={() => HandleEditArticle(post.pid)}>Edit</MDBBtn>
                      <MDBBtn
                        color="secondary"
                        onClick={() => ShowAndHideComments(post.pid)}
                      >
                        Comment
                      </MDBBtn>

                      <MDBCardText
                        id={"comments_" + post.pid}
                        style={{ display: "none" }}
                      >
                        Stella: good! Yuzu: meow!
                      </MDBCardText>
                    </MDBCol>
                  ))
                )}
              </MDBRow>
            </MDBCard>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Main;
