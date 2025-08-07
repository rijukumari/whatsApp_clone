import { Box, InputBase, styled } from "@mui/material";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { useEffect } from "react";
import { uploadFile } from "../../services/api";
import SendIcon from "@mui/icons-material/Send";
import EmojiPicker from "emoji-picker-react";

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: #919191;
  }
`;

const Search = styled(Box)`
  background-color: #ffffff;
  border-radius: 18px;
  width: calc(94% - 100px);
`;
const InputField = styled(InputBase)`
  width: 100%;
  padding: 20px;
  height: 20px;
  padding-left: 25px;
  font-size: 14px;
`;

const ClipIcon = styled(AttachFileOutlinedIcon)`
  transform: rotate(40deg);
`;

function Footer({
  sendText,
  setValue,
  value,
  file,
  setFile,
  setImage,
  inputRef,
  showEmojiPicker,
  setShowEmojiPicker,

}) {

  
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          const res = await uploadFile(data);
          console.log("Uploaded File URL:", res.data); // ✅ Check URL

          // ✅ Set the uploaded image URL to state
          setImage(res.data);
        } catch (error) {
          console.error("File upload failed:", error);
        }
      }
    };

    getImage();
  }, [file]);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setValue(e.target.files[0].name);
  };
  return (
    <Container>
      {
        showEmojiPicker && 

      <EmojiPicker
        style={{
          position: "absolute",
          bottom: "60px", // Adjust to go just above the button
          zIndex: 1500,
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#fff",
          fontFamily: "'Roboto', sans-serif",
        }}
        onEmojiClick={(e)=>setValue(value + e.emoji)}
         
      />
      }
      <EmojiEmotionsOutlinedIcon onClick = {()=> setShowEmojiPicker(!showEmojiPicker)}/>
      <label htmlFor="fileInput">
        <ClipIcon />
      </label>
      <input
        type="file"
        style={{ display: "none" }}
        id="fileInput"
        onChange={(e) => onFileChange(e)}
      />
      <Search>
        <InputField
          placeholder="Type a message..."
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => sendText(e)}
          value={value}
        />
      </Search>
      <SendIcon
        style={{
          transform: "rotate(-40deg)",
          backgroundColor: "#0ea860", // green background
          color: "#fff", // white icon
          padding: "8px",
          borderRadius: "50%", // circular button
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
        }}
        onClick={() => sendText()}
      />
    </Container>
  );
}

export default Footer;
