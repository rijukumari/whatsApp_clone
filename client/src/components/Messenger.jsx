import React from "react";
import LoginDialog from "./account/LoginDialog";
import { AppBar, Toolbar, styled, Box } from "@mui/material";
import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";
import ChatDialog from "./chat/ChatDialog";

const Component = styled(Box)`
  height: 100vh;
  background: #dcdcdc;
`;

const Header = styled(AppBar)`
  height: 125px;
  background-color: #0ea860ff;
  box-shadow: none;
`;
const LoginHeader = styled(AppBar)`
  height: 220px;
  background-color: #33eb91;
  box-shadow: none;
`;

function Messenger() {
  const {account} = useContext(AccountContext);

  return (
    <Component>
      {
        account ? 
        
        <>
        <Header>
          <Toolbar></Toolbar>
        </Header>
        <ChatDialog />
        
        </>
        :
        <>
        <LoginHeader>
          <Toolbar></Toolbar>
        </LoginHeader>
        <LoginDialog />
        
        </>

      }
    </Component>
  );
}

export default Messenger;
