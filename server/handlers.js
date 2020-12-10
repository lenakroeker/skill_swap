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

//USERS

//check if exising user/create a new user

const createUser = async (req, res) => {
  const returningUser = await getUser(req.body.email);
  console.log(returningUser);
  if (returningUser) {
    res.status(200).json({ status: 200, data: req.body, message: "Welcome" });
    return;
  } else {
    const appUsersRef = db.ref("appUsers");
    appUsersRef.push(req.body).then(() => {
      res.status(200).json({
        status: 200,
        data: req.body,
        message: "Welcome back",
      });
    });
  }
};

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

module.exports = {
  createUser,
  testHandler,
  postAd,
  getAllAds,
  getAdById,
  getUserByEmail,
  getByPoster,
  getAdByCategory,
};
