import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import { useParams } from "react-router-dom";
import style from "./styleConstants";

export const MessageDetails = () => {
  const { appUser } = useContext(AppContext);
  const [messages, setMessages] = useState();
  const params = useParams();
  const postId = params.postId;
  const messageId = params.messageId;

  useEffect(() => {
    fetch(`/account/messages/${appUser.email}/re/${postId}/${messageId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessages(data.post);
      });
  }, [appUser, postId, messageId]);

  console.log(messages);

  return (
    <>
      {messages && messages.length > 0 && (
        <Wrapper>
          <Title>Re: {messages[0].postTitle}</Title>
          {messages.map((message) => {
            return (
              <Postbox key={message.postId}>
                <p> {message.message}</p>
                <Reply>
                  <a href={`mailto:${message.senderEmail}`}>Reply by Email</a>
                </Reply>
              </Postbox>
            );
          })}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  margin: 20px 10vw 20px 10vw;
`;

const Title = styled.p`
  font-size: 20px;
`;

const Postbox = styled.div`
  padding: 10px;
  margin: 5px;
  border: 1px solid black;
  border-radius: ${style.radius};
`;

const Reply = styled.div`
  background-color: ${style.black};
  color: ${style.white};
  padding: 15px;
  margin-top: 20px;
  border-radius: ${style.radius};
  cursor: pointer;
`;

export default MessageDetails;
