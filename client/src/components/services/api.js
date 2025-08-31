import axios from 'axios';


// const BACKEND_URL=import.meta.env.REACT_APP_BACKEND_URL;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

console.log("BACKEND_URL",BACKEND_URL)

export const addUser = async(data) => {
    try{
        await axios.post(`${BACKEND_URL}/add`,data)
    }catch(error){
        console.log('Error while addUser API', error.message)
    }
}

export const getUsers = async() =>{
    try{
      let res =   await axios.get(`${BACKEND_URL}/users`);
      console.log(res);
      return res.data;
    }catch(error){
         console.log('Error while calling getusers API', error.message)
    }
}

export const setConversation = async(data) => {
    try{
        await axios.post(`${BACKEND_URL}/conversation/add`,data);

    }catch(error){
        console.log('Error while calling getConversation API', error.message)
    }
}

export const  getConversation = async(data) =>{
    try{
       let res =  await axios.post(`${BACKEND_URL}/conversation/get`,data);
       return res.data;

    }catch(error){
         console.log('Error while calling getConversation API', error.message)
    }
}

export const newMessage = async(data)=>{
    try{
        await axios.post(`${BACKEND_URL}/message/add`,data)

    }catch(error){
          console.log('Error while calling getMessages API', error.message)
    }
}


export const getMessages = async(id)=>{
    try{
      let res =   await axios.get(`${BACKEND_URL}/message/get/${id}`);
      return res.data;

    }catch(error){
         console.log('Error while calling getMessages API', error.message)
    }
}

export const clearMessagesAPI = async (conversationId) => {
  try {
    return await axios.delete(`${BACKEND_URL}/messages/${conversationId}`);
  } catch (error) {
    console.log('Error while clearing messages:', error.message);
  }
};

export const uploadFile = async(data)=>{
    try{
        return await axios.post(`${BACKEND_URL}/file/upload`,data)

    }catch(error){
        console.log('Error while calling uploadFile API', error.message)
    }
}