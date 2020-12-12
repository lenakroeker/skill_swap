import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import { AppContext } from "./AppContext";
import styled from "styled-components";
import style from "./styleConstants";

const time = moment().format("MMMM DD YYYY, h:mm a");

const initialState = {
  title: "",
  content: "",
  location: "",
  timestamp: time,
  userId: "",
  userEmail: "",
  img: "",
  postId: uuidv4(),
  editedOn: time,
  location: null,
};

export const PostForm = () => {
  const history = useHistory();

  const [formData, setFormData] = useState(initialState);
  const { appUser } = useContext(AppContext);

  useEffect(() => {
    console.log(appUser.displayName);
    setFormData({
      ...formData,
      userId: appUser.displayName,
      userEmail: appUser.email,
    });

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
    }).then(history.push(`/all`));
  };
  return (
    <Form>
      <label htmlFor="title">Title</label>
      <Input
        type="text"
        name="Title"
        onChange={(ev) => handleChange(ev.target.value, "title")}
      />
      <label htmlFor="content">Content</label>
      <ContentBox
        type="text"
        name="content"
        rows="5"
        onChange={(ev) => handleChange(ev.target.value, "content")}
      />
      <label htmlFor="content">Location</label>
      <Input
        type="text"
        name="location"
        onChange={(ev) => handleChange(ev.target.value, "location")}
      />

      <label htmlFor="img">Select image:</label>
      <input id="imgname" type="text" placeholder="Image Name" />
      <UploadImg id="myimg" />
      <label id="upProgress"></label>
      <button id="select">Select</button>
      <button id="upload">Upload</button>
      <button id="retrieve">Retrieve</button>

      <label htmlFor="category">Category</label>
      <Select
        type="dropdown"
        name="category"
        onChange={(ev) => handleChange(ev.target.value, "category")}
      >
        <option value="sportsandfitness">Sports & Fitness</option>
        <option value="foodanddrink">Food & Drink</option>
        <option value="artandcraft">Art & Craft</option>
        <option value="homeandgarden">Home & Garden</option>
        <option value="computersandtechnology">Computers & Technology</option>
        <option value="other">Other</option>
      </Select>
      <PostBtn onClick={postAd}>Post</PostBtn>
    </Form>
  );
};

const Form = styled.form`
  margin: 30px 10vw;
`;

const Input = styled.input`
  display: block;
  border-radius: ${style.radius};
  margin: 10px 5px;
  height: 30px;
  width: 95%;
`;

const ContentBox = styled.textarea`
  display: block;
  border-radius: ${style.radius};
  margin: 10px 5px;
  width: 95%;
`;

const UploadImg = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid black;
`;

const Select = styled.select`
  display: block;
  border-radius: ${style.radius} 0 0 ${style.radius};
  margin: 10px 5px;
  height: 30px;
  width: 95%;
  font-size: 16px;
  padding-left: 8px;
`;

const PostBtn = styled.button`
  background-color: ${style.skyblue};
  float: right;
`;

export default PostForm;
