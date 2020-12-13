import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import style from "./styleConstants";
import { v4 as uuidv4 } from "uuid";

export const SendMessage = () => {
  const history = useHistory();
  const { appUser } = useContext(AppContext);
  const [post, setPost] = useState(null);
  const [message, setMessage] = useState({ messageId: uuidv4() });
  const params = useParams();
  const postId = params.postId;

  console.log(message);

  useEffect(() => {
    fetch(`/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.post);
      });
    return;
  }, [postId, appUser]);

  const handleChange = (value, name) => {
    setMessage({
      ...message,
      [name]: value,
      senderEmail: appUser.email,
      posterEmail: post.userEmail,
      postId: postId,
      postTitle: post.title,
    });
  };

  const sendMessage = () => {
    fetch(`/sendmessage`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }).then(history.push(`/posts/${postId}`));
  };

  return (
    <Wrapper>
      {post && (
        <Wrapper>
          <Title>Re:{post.title}</Title>
          <ContentBox
            type="text"
            name="content"
            rows="5"
            onChange={(ev) => handleChange(ev.target.value, "message")}
          />
          <button onClick={sendMessage}>Reply!</button>
        </Wrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
`;

const Title = styled.p`
  margin: 20px;
  font-size: 20px;
  font-weight: bold;
`;
const ContentBox = styled.textarea`
  display: block;
  border-radius: ${style.radius};
  background-color: white;
  margin: 10px 5px;
  width: 80vw;
  margin: 20px auto;
`;

export default SendMessage;
