import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
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
};

export const PostForm = () => {
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
    });
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
        onChange={(ev) => handleChange(ev.target.value, "content")}
      />
      <label htmlFor="content">Location</label>
      <Input
        type="text"
        name="location"
        onChange={(ev) => handleChange(ev.target.value, "location")}
      />
      <label htmlFor="img">Select image:</label>
      <Input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={(ev) => handleChange(ev.target.value, "image")}
      />

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

const ContentBox = styled.input`
  display: block;
  border-radius: ${style.radius};
  margin: 10px 5px;
  height: 60px;
  width: 95%;
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
