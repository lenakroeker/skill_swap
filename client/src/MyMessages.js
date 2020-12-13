import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import { useHistory } from "react-router-dom";
import style from "./styleConstants";

export const MyMessages = () => {
  const { appUser } = useContext(AppContext);
  const [messages, setMessages] = useState();
  let history = useHistory();

  useEffect(() => {
    fetch(`/account/messages/${appUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessages(data.post);
      });
  }, [appUser]);

  console.log(messages);

  return (
    <>
      <Title>My Messages</Title>
      {messages && messages.length > 0 && (
        <Wrapper>
          {messages.map((message) => {
            return (
              <Postbox
                key={message.postId}
                onClick={() =>
                  history.push(
                    `/user/${appUser.email}/messages/${message.postId}/${message.messageId}`
                  )
                }
              >
                <p>Re: {message.postTitle}</p>
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

export default MyMessages;
