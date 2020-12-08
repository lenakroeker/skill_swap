import React from "react";

export const PostForm = () => {
  return (
    <form>
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
      <button onClick={postAd}>post an ad</button>
    </form>
  );
};

export default PostForm;
