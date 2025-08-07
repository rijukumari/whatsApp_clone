import { Box, styled } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import ChatHeader from "./ChatHeader"; // ✅ Import here
import { AccountContext } from "../../../context/AccountProvider";
import { getMessages, newMessage } from "../../services/api";
import Message from "./Message";

const Wrapper = styled(Box)`
  background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
  background-size: 50%;
`;

const Component = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
`;

const Container = styled(Box)`
  padding: 1px 60px;
`;

function Messages({ person, conversation }) {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [inComingMessage, setInComingMessage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const scrollRef = useRef();
  const { account, socket, newMessageFlag, setNewMessageFlag } =
    useContext(AccountContext);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setInComingMessage({
        ...data,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    const getMessageDetails = async () => {
      let data = await getMessages(conversation._id);
      setMessages(data);
    };
    conversation._id && getMessageDetails();
  }, [person._id, conversation._id, newMessageFlag]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" });
  }, [messages]);

  useEffect(() => {
    inComingMessage &&
      conversation?.members?.includes(inComingMessage.senderId) &&
      setMessages((prev) => [...prev, inComingMessage]);
  }, [inComingMessage, conversation]);

  const sendText = async (e) => {
    const code = e?.keyCode || e?.which || 13; // default 13 for button click
    if (code === 13) {
      let message = {};
      if (!file) {
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "text",
          text: value,
        };
      } else {
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "file",
          text: image,
        };
      }

      socket.current.emit("sendMessage", message);
      await newMessage(message);
      setValue("");
      setFile("");
      setImage("");
      setNewMessageFlag((prev) => !prev);
      setShowEmojiPicker(false);
    }
  };

  return (
    <>
      <Wrapper>
        {/* ✅ ChatHeader added here */}
        <ChatHeader
          person={person}
          conversationId={conversation._id}
          setMessages={setMessages}
        />
        <Component>
          {messages &&
            messages.map((message) => (
              <Container ref={scrollRef} key={message._id}>
                <Message message={message} />
              </Container>
            ))}
        </Component>
        <Footer
          sendText={sendText}
          setValue={setValue}
          value={value}
          file={file}
          setFile={setFile}
          setImage={setImage}
          setShowEmojiPicker={setShowEmojiPicker}
          showEmojiPicker={showEmojiPicker}
        />
      </Wrapper>
    </>
  );
}

export default Messages;
