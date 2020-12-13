import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { useHistory } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import { AppContext } from "./AppContext";
import styled from "styled-components";
import style from "./styleConstants";
import { storage } from "./firebase";

const time = moment().format("MMMM DD YYYY, h:mm a");

const initialState = {
  title: "",
  content: "",
  location: "",
  timestamp: time,
  userId: "",
  userEmail: "",
  imageURL: "",
  postId: "",
  seeking: "",
  category: "",
  editedOn: time,
  isUploading: false,
  progress: 0,
};

export const PostForm = () => {
  const history = useHistory();

  const [formData, setFormData] = useState(initialState);

  const [image, setImage] = useState(null);
  const [imageurl, setImageurl] = useState(null);
  const { appUser } = useContext(AppContext);

  console.log(appUser);

  useEffect(() => {
    console.log(appUser.displayName);
    console.log(appUser.email);
    setFormData({
      ...formData,
      userId: appUser.displayName,
      userEmail: appUser.email,
      postId: uuidv4(),
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

  const handleImgChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  console.log("image: ", image);

  const handleImgUpload = (event) => {
    event.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    console.log(1);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setImageurl(url);
          });
      }
    );
  };

  console.log(imageurl);

  useEffect(() => {
    setFormData({ ...formData, imageURL: imageurl });
  }, [imageurl]);

  return (
    <Form>
      <input
        onChange={(ev) => handleChange(ev.target.value, "seeking")}
        type="radio"
        id="seeking1"
        name="Seeking"
        value="seeking"
      />
      <label for="seeking1">Seeking</label>
      <input
        onChange={(ev) => handleChange(ev.target.value, "seeking")}
        type="radio"
        id="seeking2"
        name="Seeking"
        value="offering"
      />
      <label for="seeking2">Offering</label>
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

      <label>image:</label>
      <input type="file" onChange={handleImgChange} />
      <button onClick={handleImgUpload}>upload</button>

      {imageurl && <Img src={imageurl} />}

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

const Img = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  object-fit: cover;
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
