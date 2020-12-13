import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { AppContext } from "./AppContext";
import style from "./styleConstants";

const time = moment().format("MMMM DD YYYY, h:mm a");

export const Edit = () => {
  const history = useHistory();
  const { appUser } = useContext(AppContext);
  const [post, setPost] = useState();
  const [formData, setFormData] = useState();
  const params = useParams();
  const postId = params.postId;

  console.log(formData);
  console.log(time);
  useEffect(() => {
    fetch(`/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.post);
      });
  }, []);

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value, editedOn: time });
  };

  const handleDelete = () => {
    fetch(`/posts/${postId}/delete`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        window.alert(`post ${postId} has been deleted`);
      })
      .then(history.push(`/user/${appUser.email}`));
  };

  const handleUpdate = () => {
    fetch(`/posts/${postId}/update`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        window.alert(`post ${postId} has been updated`);
      })
      .then(history.push(`/user/${appUser.email}`));
  };

  console.log(post);
  return (
    <Wrapper>
      {post && (
        <UpdateForm>
          <p>{post.timestamp}</p>
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            name="Title"
            onChange={(ev) => handleChange(ev.target.value, "title")}
            placeholder={post.title}
          />
          <label htmlFor="content">Content</label>
          <ContentBox
            type="text"
            name="content"
            rows="5"
            placeholder={post.content}
            onChange={(ev) => handleChange(ev.target.value, "content")}
          />
          <label htmlFor="content">Location</label>
          <Input
            type="text"
            name="location"
            onChange={(ev) => handleChange(ev.target.value, "location")}
          />
          {post.imageURL && <Img src={post.imageURL} />}

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
            <option value="computersandtechnology">
              Computers & Technology
            </option>
            <option value="other">Other</option>
          </Select>
          <Button onClick={handleUpdate}>Update Post</Button>
          <Button onClick={handleDelete}>Delete Post</Button>
        </UpdateForm>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  background-color: white;
  margin: 30px auto;
  width: 80vw;
  padding: 20px;
`;

const UpdateForm = styled.div``;

const ContentBox = styled.textarea`
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

const Input = styled.input`
  display: block;
  border-radius: ${style.radius};
  margin: 10px 5px;
  height: 30px;
  width: 95%;
`;

const Button = styled.button`
  height: 30px;
  padding: 5px 15px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

export default Edit;
