import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const newMessage = async (req, res) => {
  try {
    let msgText;

    if (
      req.body.type === "file" &&
      typeof req.body.text === "object" &&
      req.body.text.imageUrl
    ) {
      msgText = req.body.text.imageUrl;
    } else {
      msgText = req.body.text;
    }

    const newMessage = new Message({
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
      conversationId: req.body.conversationId,
      type: req.body.type,
      text: msgText,
    });

    await newMessage.save();

    await Conversation.findByIdAndUpdate(req.body.conversationId, {
      message: msgText,
    });

    return res.status(200).json("Message has been sent successfully");
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json(error.message);
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json(error.message);
  }
};

export const clearMessages = async (req, res) => {
  try {
    await Message.deleteMany({ conversationId: req.params.conversationId });
    res.status(200).json({ message: 'Messages cleared successfully' });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// In your messages.controller.js

  
