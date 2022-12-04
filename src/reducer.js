//import { ActionTypes } from "./actions/actionType";
import Users from "./Data/users.json";
import Posts from "./Data/posts.json";
import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "counter",
  storage,
};

const initialState = {
  loggedInUser: null,
  loggedInUserPosts: [],
  existedUsers: [],
  ErrorLogin: null,
  //followers: [],
  posts: [],
};

export function reducer (state = initialState, action) {
  switch (action.type) {
    case "REGISTER_USER":
      return {
        ...state,
        loggedInUser: action.payload,
      };

    case "LOGIN_USER":
      return {
        ...state,
        loggedInUser: action.payload,
      };

    case "LOGOUT":
      return initialState;

    case "INVALID_LOGIN":
      return {
        ...state,
        ErrorLogin: "Invalid Login",
      };

    case "SEARCH_POSTS":
      return {
        ...state,
        loggedInUserPosts: action.payload.search_posts,
      };

    case "ADD_FOLLOWER":
      return {
        ...state,
        followers: action.payload.followers,
      };

    case "REMOVE_FOLLOWER":
      return {
        ...state,
        followers: action.payload.followers,
        posts: action.payload.articles,
      };

    case "UPDATE_HEADLINE":
      return {
        ...state,
        existedUsers: action.payload.all_users,
      };

    case "GET_EMAIL":
      return {
        ...state,
        email: action.payload.email,
      };

    case "GET_ZIPCODE":
      return {
        ...state,
        zipcode: action.payload.zipcode,
      };

    case "GET_PHONE":
      return {
        ...state,
        phone: action.payload.phone,
      };

    case "GET_HEADLINE":
      return {
        ...state,
        headline: action.payload.headline,
      };
      

    case "GET_FOLLOWER":
      return {
        ...state,
        followers: action.payload.followers,
      };

    case "GET_ARTICLES":
      return {
        ...state,
        posts: action.payload.articles,
      };

    case "GET_AVATAR":
      return {
        ...state,
        avatar: action.payload.avatar,
      };

    default:
      return state;
  }
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, composeWithDevTools());

export default store;

//export default createStore(reducer, composeWithDevTools());
