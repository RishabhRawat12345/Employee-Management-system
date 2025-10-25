const express = require('express');
const router = express.Router();
const ChatMessage = require('../Model/Messagedb'); 
router.post('/messagessend', async (req, res) => {
  const { user, message } = req.body;

  try {
    const newMessage = new ChatMessage({ user, message });
    await newMessage.save();
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, message: 'Failed to save message' });
  }
});
router.get('/messagesget', async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch messages' });
  }
});

module.exports = router;
