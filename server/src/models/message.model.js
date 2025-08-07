import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    conversationId:{
        type:String
    },
    senderId:{
        type:String
    },
    receiverId:{
        type:String
    },
    text:{
        type:String
        
    },
    type:{
        type:String
    },
    delivered: {
        type: Boolean,
        default: false
    },
    seen: {
        type: Boolean,
        default: false
    }
},
{
    timestamps:true
}

)

const Message = mongoose.model('Message', messageSchema);
export default Message;