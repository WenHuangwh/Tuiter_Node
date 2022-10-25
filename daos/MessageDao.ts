/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */

import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of messages
 * @property {MessageDao} MessageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static MessageDao: MessageDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.MessageDao === null) {
            MessageDao.MessageDao = new MessageDao();
        }
        return MessageDao.MessageDao;
    }
    private constructor() { }

    /**
     * Uses MessageMoel to create new message documents in message collection
     * @param {string} fromid User send message
     * @param {string} toid User receive message
     * @param {string} message Message content
     * @returns New Message
     */
    sendMessage = async (fromid: string, toid: string, message: string): Promise<Message> =>
        MessageModel.create({ from: fromid, to: toid, message: message, sentOn: new Date })

    /**
     * Removes message from the database.
     * @param {string} mid Primary key of message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    deleteMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({ _id: mid })

    /**
     * Use MessageModel to retrieve all message send by a user
     * @param {string} uid User who sends message
     * @returns Message array
     */
    findAllMessageUserSend = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({ from: uid })
            .populate("to")
            .populate("from")
            .exec()

    /**
     * Use MessageModel to retrieve all message a user receives
     * @param {string} uid User who receives message
     * @returns Message array
     */
    findAllMessageUserReceive = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({ to: uid })
            .populate("to")
            .populate("from")
            .exec()

    /**
     * Use MessageModel to retrieve all message send from one user and received by another user
     * @param {string} fromid User who sends message
     * @param {string} toid User who receives message
     * @returns Message array
     */
    findMessageBetweenTwoUsers = async (fromid: string, toid: string): Promise<Message[]> =>
        MessageModel
            .find({ from: fromid, to: toid })
            .populate("from")
            .populate("to")
            .exec()
}