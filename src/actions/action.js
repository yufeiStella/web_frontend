import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT,
  INVALID_LOGIN,
  SEARCH_POSTS,
  ADD_FOLLOWER,
  REMOVE_FOLLOWER,
  UPDATE_HEADLINE,
  GET_EMAIL,
  GET_ZIPCODE,
  GET_PHONE,
  GET_HEADLINE,
  GET_FOLLOWER,
  GET_ARTICLES,
  GET_AVATAR,
} from "./actionType";

export function registerUser(
  username, password
) {
  return {
    type: REGISTER_USER,
    payload: {
      username: username,
      password: password,
    },
  };
}

export function loginUser(username, password) {
  return {
    type: LOGIN_USER,
    payload: {
      username: username,
      password: password,
    },
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function invalidLogin() {
  return {
    type: INVALID_LOGIN,
  };
}

export function searchPosts(search_posts) {
  return {
    type: SEARCH_POSTS,
    payload: {
      search_posts: search_posts,
    },
  }
}

export function add_follower(followers) {
  return {
    type: ADD_FOLLOWER,
    payload: {
      followers: followers,
    },
  }
}

export function remove_follower(followers, articles) {
  return {
    type: REMOVE_FOLLOWER,
    payload: {
      followers: followers,
      articles: articles,
    },
  }
}

export function update_headline(all_users) {
  return {
    type: UPDATE_HEADLINE,
    payload: {
      all_users: all_users,
    },
  }
}

export function get_email(email) {
  return {
    type: GET_EMAIL,
    payload: {
      email: email,
    },
  }
}

export function get_zipcode(zipcode) {
  return {
    type: GET_ZIPCODE,
    payload: {
      zipcode: zipcode,
    },
  }
}

export function get_phone(phone) {
  return {
    type: GET_PHONE,
    payload: {
      phone: phone,
    },
  }
}

export function get_headline(headline) {
  return {
    type: GET_HEADLINE,
    payload: {
      headline: headline,
    },
  }
}

export function get_follower(followers) {
  return {
    type: GET_FOLLOWER,
    payload: {
      followers: followers,
    },
  }
}

export function get_articles(articles) {
  return {
    type: GET_ARTICLES,
    payload: {
      articles: articles,
    },
  }
}

export function get_avatar(avatar) {
  return {
    type: GET_AVATAR,
    payload: {
      avatar: avatar,
    },
  }
}





