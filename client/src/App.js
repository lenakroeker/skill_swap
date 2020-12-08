import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyles from "./globalStyles";
import AllPosts from "./AllPosts";
import moment from "moment";

import { AppContext } from "./AppContext";

function App() {
  const { appUser, signInWithGoogle, handleSignOut, message } = useContext(
    AppContext
  );

  const time = moment().format("MMMM DD YYYY, h:mm a");

  const initialState = {
    title: "",
    content: "",
    location: "",
    timestamp: time,
    userId: "",
    userEmail: "",
    img: "",
  };

  const [reFetch, setReFetch] = useState(false);
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    console.log(appUser.displayName);
    setFormData({ ...formData, userId: appUser.displayName });
    setFormData({ ...formData, userEmail: appUser.email });

    return;
  }, [appUser]);

  console.log(formData);

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const postAd = () => {
    fetch(`/posted`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setReFetch((state) => !state);
  };

  return (
    <>
      <GlobalStyles />
      {appUser && appUser.email ? (
        <Wrapper>
          <h2>
            {message} {appUser.displayName}!
          </h2>
          <button onClick={handleSignOut}>sign out</button>
          <button onClick={postAd}>post an ad</button>
        </Wrapper>
      ) : (
        <Wrapper>
          <button onClick={signInWithGoogle}>sign in with google</button>
        </Wrapper>
      )}

      {/* form */}

      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="Title"
        onChange={(ev) => handleChange(ev.target.value, "title")}
      />
      <label htmlFor="content">Content</label>
      <input
        type="text"
        name="content"
        onChange={(ev) => handleChange(ev.target.value, "content")}
      />
      <label htmlFor="content">Location</label>
      <input
        type="text"
        name="location"
        onChange={(ev) => handleChange(ev.target.value, "location")}
      />
      {/* form end */}

      <AllPosts setReFetch={setReFetch} />
    </>
  );
}

const Wrapper = styled.div``;

export default App;
