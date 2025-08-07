import { Box, styled, Typography } from "@mui/material";
import React, { useContext } from "react";
import { formatDate, downloadMedia } from "../../utils/common-utils";
import { AccountContext } from "../../../context/AccountProvider";
import GetAppIcon from "@mui/icons-material/GetApp";
import { iconPDF } from "../../../data/data";

const Own = styled(Box)`
  background: #dcf8c6;
  max-width: 60%;
  margin-left: auto;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
  flex-direction: column;
`;

const Wrapper = styled(Box)`
  background: #ffffff;
  max-width: 60%;
  margin-right: auto;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
  flex-direction: column;
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 12px;
  color: #919191;
  margin-top: 4px;
  align-self: flex-end;
`;

function Message({ message }) {
  const { account } = useContext(AccountContext);
  console.log("Message createdAt:", message.createdAt);

  const isOwnMessage = account.sub === message.senderId;

  return isOwnMessage ? (
    <Own>
      {message.type === "file" ? (
        <ImageMessage message={message} />
      ) : (
        <TextMessage message={message} />
      )}
    </Own>
  ) : (
    <Wrapper>
      {message.type === "file" ? (
        <ImageMessage message={message} />
      ) : (
        <TextMessage message={message} />
      )}
    </Wrapper>
  );
}

const ImageMessage = ({ message }) => {
  const isPDF = message?.text?.includes(".pdf");
  const fileName = message.text?.split("/").pop();

  return (
    <Box style={{ position: "relative" }}>
      {isPDF ? (
        <Box style={{ display: "flex", alignItems: "center" }}>
          <img src={iconPDF} alt="pdf" style={{ width: 80 }} />
          <Typography style={{ fontSize: 14 }}>{fileName}</Typography>
        </Box>
      ) : (
        <img
          src={message.text}
          alt="uploaded-img"
          style={{ width: 300, height: "auto", objectFit: "cover" }}
        />
      )}

      <Time
        style={{
          position: "absolute",
          bottom: 0,
          right: 8,
          display: "flex",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <GetAppIcon
          onClick={(e) => downloadMedia(e, message.text)}
          style={{ cursor: "pointer", fontSize: 16 }}
        />
        {formatDate(message.createdAt)}
      </Time>
    </Box>
  );
};

const TextMessage = ({ message }) => {
  return (
    <>
      <Text>{message.text}</Text>
      <Time>{formatDate(message.createdAt)}</Time>
    </>
  );
};

export default Message;
