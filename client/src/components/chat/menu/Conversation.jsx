import React from "react";
import { useEffect, useState, useContext } from "react";
import { getUsers } from "../../services/api";
import { Box, Divider, styled } from "@mui/material";
import Conversations from "./Conversations";
import { AccountContext } from "../../../context/AccountProvider";

const Component = styled(Box)`
  height: 81vh;
  overflow: overlay;
`;

const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background-color: #e9edef;
  opacity: 0.6;
`;

function Conversation({ text }) {
  const [users, setUsers] = useState([]);
  const { account,socket,setActiveUsers } = useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getUsers();
      const filteredData = res.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setUsers(filteredData);
    };
    fetchData();
  }, [text]);

useEffect(()=>{
  socket.current.emit('addUsers',account);
  socket.current.on('getUsers',users=>{
    setActiveUsers(users)

  })
},[account])


  return (
    <Component>
     
      {users.map(
        (user) =>
          user.sub !== account.sub && (
            <React.Fragment key={user.sub}>
              <Conversations user={user} />
              <StyledDivider />
            </React.Fragment>
          )
      )}
    </Component>
  );
}

export default Conversation;
