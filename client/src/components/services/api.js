import axios from 'axios';

const url = 'http://localhost:2345';

export const addUser = async(data) => {
    try{
        await axios.post(`${url}/add`,data)
    }catch(error){
        console.log('Error while addUser API', error.message)
    }
}

export const getUsers = async() =>{
    try{
      let res =   await axios.get(`${url}/users`);
      console.log(res);
      return res.data;
    }catch(error){
         console.log('Error while calling getusers API', error.message)
    }
}

export const setConversation = async(data) => {
    try{
        await axios.post(`${url}/conversation/add`,data);

    }catch(error){
        console.log('Error while calling getConversation API', error.message)
    }
}

export const  getConversation = async(data) =>{
    try{
       let res =  await axios.post(`${url}/conversation/get`,data);
       return res.data;

    }catch(error){
         console.log('Error while calling getConversation API', error.message)
    }
}

export const newMessage = async(data)=>{
    try{
        await axios.post(`${url}/message/add`,data)

    }catch(error){
          console.log('Error while calling getMessages API', error.message)
    }
}


export const getMessages = async(id)=>{
    try{
      let res =   await axios.get(`${url}/message/get/${id}`);
      return res.data;

    }catch(error){
         console.log('Error while calling getMessages API', error.message)
    }
}

export const clearMessagesAPI = async (conversationId) => {
  try {
    return await axios.delete(`${url}/messages/${conversationId}`);
  } catch (error) {
    console.log('Error while clearing messages:', error.message);
  }
};

export const uploadFile = async(data)=>{
    try{
        return await axios.post(`${url}/file/upload`,data)

    }catch(error){
        console.log('Error while calling uploadFile API', error.message)
    }
}