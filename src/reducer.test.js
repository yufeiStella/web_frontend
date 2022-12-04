import React from "react";
import { reducer } from "./reducer";
import { Provider } from "react-redux";
import Users from "./Data/users.json";
import Posts from "./Data/posts.json";
import {add_follower, add_follower_articles, loginUser, remove_follower, searchPosts} from "./actions/action";

test("test_initial_state", () => {
  const state = reducer(undefined, { type: "unknow" });
  
  expect(state).toEqual({
    newUsers: null,
    loggedInUser: null,
    loggedInUserPosts: [],
    existedUsers: Users,
    ErrorLogin: null,
    followers: [],
    posts: Posts,
  });
});

test("test_loginUser", () => {
  const state = reducer(undefined, loginUser("Bret", "Kulas Light"));
  expect(state.loggedInUser.username).toEqual("Bret");
})

test("test_logout", () => {
  const state = reducer(undefined, loginUser("Bret", "Kulas Light"));
  expect(state.loggedInUser.username).toEqual("Bret");
  const state2 = reducer(state, {type: "LOGOUT"});
  expect(state2.loggedInUser).toEqual(null);
})

test("test_invalid_login", () => {
  const state = reducer(undefined, {type: "INVALID_LOGIN"});
  expect(state.ErrorLogin).toEqual("Invalid Login");
})

test("test_fetch_articles", () => {
  const state = reducer(undefined, loginUser("Bret", "Kulas Light", 1));
  expect(state.loggedInUser.username).toEqual("Bret");
  expect(state.loggedInUserPosts).toEqual(Posts.filter((post) => post.userId === 1 || post.userId === 2 || post.userId === 3 || post.userId === 4));
})

test("test_fetch_search", () => {
  const state = reducer(undefined, loginUser("Bret", "Kulas Light", 1));
  const state2 = reducer(state, searchPosts(Posts.filter((post) => post.userId === 1)));
  expect(state2.loggedInUserPosts).toEqual(Posts.filter((post) => post.userId === 1));
})

test("test_addArticles_when_addFollower", () => {
  const state = reducer(undefined, loginUser("Bret", "Kulas Light", 1));
  const state2 = reducer(state, add_follower(Users.filter((user) => user.id === 5 || user.id === 2 || user.id === 3 || user.id === 4), Posts.filter((post) => post.userId === 5)));
  expect(state2.followers).toEqual(Users.filter((user) => user.id === 5 || user.id === 2 || user.id === 3 || user.id === 4));
  expect(state2.loggedInUserPosts).toEqual(Posts.filter((post) => post.userId === 1 || post.userId === 2 || post.userId === 3 || post.userId === 4 || post.userId === 5));
})

test("test_removeArticles_when_removeFollower", () => {
  const state = reducer(undefined, loginUser("Bret", "Kulas Light", 1));
  // remove id 2
  const state2 = reducer(state, remove_follower(Users.filter((user) => user.id === 3 || user.id === 4), Posts.filter((post) => post.userId === 2)));
  expect(state2.followers).toEqual(Users.filter((user) => user.id === 3 || user.id === 4));
  expect(state2.loggedInUserPosts).toEqual(Posts.filter((post) => post.userId === 1 || post.userId === 3 || post.userId === 4));
})


test("test_fetch_username", () => {
  const state = reducer(undefined, loginUser("Bret", "Kulas Light", 1));
  expect(state.loggedInUser.username).toEqual("Bret");
})

