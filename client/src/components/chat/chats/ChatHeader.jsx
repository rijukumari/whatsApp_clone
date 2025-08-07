import { Box, styled, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Search from "@mui/icons-material/Search";
import { useContext, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../../context/AccountProvider";
import { clearMessagesAPI } from "../../services/api";

const Header = styled(Box)`
  height: 44px;
  background: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const MenuOption = styled(MenuItem)`
  font-size: 14px;
  padding: 15px 60px 5px 24px;
  color: #4a4a4a;
`;

const Image = styled("img")({
  height: 40,
  width: 40,
  objectFit: "cover",
  borderRadius: "50%",
});

const Name = styled(Typography)`
  margin-left: 12px !important;
`;

const Status = styled(Typography)`
  margin-left: 12px !important;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
`;

const RightContainer = styled(Box)`
  margin-left: auto;
  & > svg {
    padding: 8px;
    font-size: 24px;
    color: #000;
  }
`;

function ChatHeader({ person, conversationId, setMessages }) {
  const { activeUsers, logout } = useContext(AccountContext);
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleClick = (e) => {
    setOpen(e.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleClearChat = async () => {
    await clearMessagesAPI(conversationId);
    setMessages([]);
    handleClose();
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/");
  };

  // ✅ Check if this person is in the activeUsers list
  const isUserOnline = activeUsers?.some((user) => user.sub === person.sub);

  return (
    <Header>
      <Image src={person.picture} alt="dp" />
      <Box>
        <Name>{person.name}</Name>
        <Status
          style={{
            marginLeft: "12px",
            fontSize: "12px",
            fontWeight: "bold",
            color: isUserOnline ? "#0ea860ff" : "rgba(0,0,0,0.6)",
          }}
        >
          {isUserOnline ? "Online" : "Offline"}
        </Status>
      </Box>
      <RightContainer>
        <Search />
        <MoreVertIcon onClick={handleClick} />
        <Menu
          anchorEl={open}
          open={Boolean(open)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuOption onClick={handleClearChat}>Clear Chat</MenuOption>
          <MenuOption onClick={handleLogout}>Logout</MenuOption>
        </Menu>
      </RightContainer>
    </Header>
  );
}

export default ChatHeader;
