"use strict";

const admin = require("firebase-admin");

require("dotenv").config;

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT,
  }),
  databaseURL: process.env.FB_DATABASE_URL,
});

const db = admin.database();

const testHandler = (req, res) => {
  console.log("test success");
  res.status(200).json({ status: 200, data: "it works" });
};

//AD POSTS

//get all posts

const getAllAds = (req, res) => {
  console.log("test success");
  const allPosts = db.ref("postedAds");
  allPosts.ref.once(
    "value",
    function (snapshot) {
      console.log(snapshot.val());
      res.status(200).json({ status: 200, data: snapshot.val() });
    },
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    }
  );
};

// get post by id

const getAdById = async (req, res) => {
  const id = req.params.postId;
  console.log("by id running");
  try {
    const data = await queryDatabase(`postedAds`);
    const dataValue = Object.keys(data)
      .map((item) => data[item])
      .find((obj) => obj.postId === id);
    console.log(dataValue);
    if (dataValue) {
      console.log(dataValue);
      res.status(200).json({
        status: 200,
        post: dataValue,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// get post by category

const getAdByCategory = async (req, res) => {
  const category = req.params.category;
  console.log("by category running");
  try {
    const data = await queryDatabase(`postedAds`);
    const dataValue = Object.keys(data)
      .map((item) => data[item])
      .filter((obj) => obj.category === category);
    console.log(dataValue);
    if (dataValue) {
      console.log(dataValue);
      res.status(200).json({
        status: 200,
        post: dataValue,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get posts by type

const getAdByType = async (req, res) => {
  const seeking = req.params.seeking;
  console.log("by seeking running");
  try {
    const data = await queryDatabase(`postedAds`);
    const dataValue = Object.keys(data)
      .map((item) => data[item])
      .filter((obj) => obj.seeking === seeking);
    console.log(dataValue);
    if (dataValue) {
      console.log(dataValue);
      res.status(200).json({
        status: 200,
        post: dataValue,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get post by poster email

const getByPoster = async (req, res) => {
  const email = req.params.userEmail;
  console.log(email);
  try {
    const data = await queryDatabase(`postedAds`);
    console.log("array posts", data);
    const dataValue = Object.keys(data)
      .map((item) => data[item])
      .filter((obj) => obj.userEmail === email);
    if (dataValue) {
      res.status(200).json({
        status: 200,
        post: dataValue,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get favorites

const getFavorites = async (req, res) => {
  const email = req.params.userEmail;
  console.log(email);
  try {
    const data = await queryDatabase(`likes`);
    console.log("likes", data);
    const dataValue = Object.keys(data)
      .map((item) => data[item])
      .filter((obj) => obj.userEmail === email);
    if (dataValue) {
      res.status(200).json({
        status: 200,
        post: dataValue,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get messages

const getMessages = async (req, res) => {
  const email = req.params.userEmail;
  console.log(email);
  try {
    const data = await queryDatabase(`messages`);
    console.log("messages", data);
    const dataValue = Object.keys(data)
      .map((item) => data[item])
      .filter((obj) => obj.posterEmail === email);
    if (dataValue) {
      res.status(200).json({
        status: 200,
        post: dataValue,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get message details

const getMessageDetails = async (req, res) => {
  const email = req.params.userEmail;
  const postId = req.params.postId;
  const messageId = req.params.messageId;
  console.log(email);
  try {
    const data = await queryDatabase(`messages`);
    console.log("messages", data);
    const dataValue = Object.keys(data)
      .map((item) => data[item])
      .filter(
        (obj) =>
          obj.posterEmail === email &&
          obj.postId === postId &&
          obj.messageId === messageId
      );
    if (dataValue) {
      res.status(200).json({
        status: 200,
        post: dataValue,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//post an ad

const postAd = async (req, res) => {
  const appPostsRef = db.ref("postedAds");
  console.log(appPostsRef);
  appPostsRef.push(req.body).then(() => {
    res.status(200).json({
      status: 200,
      message: "ad successfully posted!",
    });
  });
};

const deletePost = async (req, res) => {
  const id = req.params.postid;
  console.log("delete backend", id);

  try {
    const data = await queryDeleteFromDatabase(`postedAds`, id);
    res.status(200).json({
      status: 200,
      message: `post ${id} has been deleted`,
    });
  } catch (error) {
    console.log(error);
  }
};

//update post

const updatePost = async (req, res) => {
  const id = req.params.postid;
  console.log("update backend", id);
  console.log("update req", req.body);
  try {
    const data = await queryUpdateInDatabase(`postedAds`, id, req.body);
    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (error) {
    // console.log(error);
  }
};

const likePost = async (req, res) => {
  const appPostsRef = db.ref("likes");
  console.log(appPostsRef);
  appPostsRef.push(req.body).then(() => {
    res.status(200).json({
      status: 200,
      message: "ad successfully posted!",
    });
  });
};

const sendMessage = async (req, res) => {
  const appPostsRef = db.ref("messages");
  console.log(appPostsRef);
  appPostsRef.push(req.body).then(() => {
    res.status(200).json({
      status: 200,
      message: "message successfully sent!",
    });
  });
};

//USERS

//check if exising user/create a new user

const createUser = async (req, res) => {
  const returningUser = await getUser(req.body.email);
  console.log(returningUser);
  if (returningUser) {
    res
      .status(200)
      .json({ status: 200, data: req.body, message: "Welcome Back" });
    return;
  } else {
    const appUsersRef = db.ref("appUsers");
    appUsersRef.push(req.body).then(() => {
      res.status(200).json({
        status: 200,
        data: req.body,
        message: "Welcome",
      });
    });
  }
};

const getUser = async (email) => {
  const data = (await queryDatabase(`appUsers`)) || {};
  const dataValue = Object.keys(data)
    .map((item) => data[item])
    .find((obj) => obj.email === email);
  return dataValue || false;
};

//get user by email
const getUserByEmail = async () => {
  const email = req.params.email;
  try {
    const data = await queryDatabase(`appUsers`);
    const dataValue = Object.keys(data)
      .map((item) => data[item])
      .find((obj) => obj.email === email);
    console.log(dataValue);
    if (dataValue) {
      res.status(200).json({
        status: 200,
        user: dataValue,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//get user by id

const getUserById = async (req, res) => {};

//query database

const queryDatabase = async (key) => {
  const ref = db.ref(key);
  let data;
  await ref.once(
    "value",
    (snapshot) => {
      data = snapshot.val();
    },
    (err) => {
      console.log(err);
    }
  );
  return data;
};

const queryDeleteFromDatabase = async (key, id) => {
  const ref = db.ref(key);
  let data;
  await ref.once(
    "value",
    (snapshot) => {
      snapshot.forEach((child) => {
        console.log(child.val());
        if (child.val().postId == id) {
          child.ref.remove();
        }
      });
    },
    (err) => {
      console.log(err);
    }
  );
  return data;
};

const queryUpdateInDatabase = async (key, id, newVal) => {
  const ref = db.ref(key);
  let data;
  await ref.once(
    "value",
    (snapshot) => {
      snapshot.forEach((child) => {
        console.log(child.val(), "child val");
        if (child.val().postId == id) {
          child.ref.update(newVal);
        }
      });
    },
    (err) => {
      console.log("broke in query");
    }
  );
  return data;
};

module.exports = {
  createUser,
  testHandler,
  postAd,
  getAllAds,
  getAdById,
  getUserByEmail,
  getByPoster,
  getAdByCategory,
  deletePost,
  updatePost,
  getAdByType,
  likePost,
  sendMessage,
  getFavorites,
  getMessages,
  getMessageDetails,
};
