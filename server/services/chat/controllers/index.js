const askChatGpt = require("../chatgpt");
const { convertChatToPrompts } = require("../helpers");
const Chat = require("../mongo/models/Chat");

class Controller {
  static async listChat(req, res, next) {
    try {
      const { userId } = req.params;

      let chat = await Chat.findOne({
        UserId: +userId,
      });

      if (!chat) throw { message: "Not Found" };

      res.status(200).json(chat);
    } catch (error) {
      next(error);
    }
  }

  static async createChat(req, res, next) {
    try {
      const { counselorId, chat } = req.body;
      const { userId } = req.params;

      let chats = await Chat.findOne({
        UserId: +userId,
        CounselorId: +counselorId,
      });

      if (!chats) {
        chats = { UserId: +userId, chats: [], CounselorId: counselorId };
      } else {
        chats.chats.push({ ...chat, time: new Date() });
      }

      await Chat.updateOne(
        { UserId: +userId, CounselorId: +counselorId },
        { $set: { ...chats } },
        { upsert: true }
      );

      res.status(201).json(chats);
    } catch (error) {
      next(error);
    }
  }

  static async chatWithLivy(req, res, next) {
    try {
      const { text, sender } = req.body;
      const { userId } = req.params;

      let chats = await Chat.findOne({
        UserId: +userId,
        CounselorId: null,
      });

      if (!chats) {
        chats = { UserId: +userId, chats: [], CounselorId: null };
      } else {
        chats.chats.push({ text, time: new Date(), sender });
      }

      const response = await askChatGpt(convertChatToPrompts(chats.chats));
      chats.chats.push({ text: response.choices[0].text, time: new Date() });

      await Chat.updateOne(
        { UserId: +userId, CounselorId: null },
        { $set: { ...chats } },
        { upsert: true }
      );

      res.status(200).json({ message: response.choices[0].text });
    } catch (error) {
      next(error);
    }
  }

  static async getChatWithLivy(req, res) {
    try {
      const { userId } = req.params;

      let chats = await Chat.findOne({
        UserId: +userId,
        CounselorId: null,
      });

      if (!chats) {
        chats = { UserId: +userId, chats: [], CounselorId: null };
      }

      res.status(200).json(chats);
    } catch (error) {
      next(error);
    }
  }

  static async listChatByCounselor(req, res, next) {
    try {
      const { counselorId } = req.params;

      let chat = await Chat.find({
        CounselorId: +counselorId,
      }).toArray();

      if (!chat) throw { message: "Not Found" };

      res.status(200).json(chat);
    } catch (error) {
      next(error);
    }
  }

  static async listChatByUserAndCounselor(req, res, next) {
    try {
      const { counselorId, userId } = req.params;

      let chat = await Chat.findOne({
        CounselorId: +counselorId,
        UserId: +userId,
      });

      if (!chat) {
        chat = { UserId: +userId, chats: [], CounselorId: +counselorId }
      }

      res.status(200).json(chat);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
