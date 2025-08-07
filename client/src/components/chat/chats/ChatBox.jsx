import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Messages from './Messages'
import { AccountContext } from '../../../context/AccountProvider'
import { getConversation } from '../../services/api';

function ChatBox() {
  const {person,account} = useContext(AccountContext);
  const [conversation,setConversation] = useState({});

  useEffect(()=>{
    const getConversationDetails = async()=>{
     let data = await getConversation({senderId:account.sub,receiverId:person.sub});
     setConversation(data)
     console.log("Data", data)
    }
    getConversationDetails()

  },[person.sub])

  return (
    <Box style = {{height:'75%'}}>
      <Messages  person = {person} conversation = {conversation}/>
    </Box>
  )
}

export default ChatBox




