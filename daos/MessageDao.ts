/**
 * @file Implements DAO managing data storage of messages. Uses mongoose UserModel
 * to integrate with MongoDB
 */

import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
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
     * @returns New message
     */
    sendMessage = async (fromid: string, toid: string, message: string): Promise<Message> =>
        MessageModel.create({ from: fromid, to: toid, message: message, sentOn: new Date })

    /**
     * Removes message from the database.
     * @param {string} mid Primary key of message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    deleteMessage = async (mid: string): Promise<any> =>
        MessageModel.remove({ _id: mid })

    /**
     * Use MessageModel to retrieve all message send by a user
     * @returns Message array
     */
    findAllMessageUserSend = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({ from: uid })
            .populate("to")
            .exec()

    /**
     * Use MessageModel to retrieve all message a user receives
     * @returns Message array
     */
    findAllMessageUserReceive = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({ to: uid })
            .populate("from")
            .exec()

    /**
     * Use MessageModel to retrieve all message send from one user and received by another user
     * @returns Message array
     */
    findMessageBetweenTwoUsers = async (fromid: string, toid: string): Promise<Message[]> =>
        MessageModel
            .find({ from: fromid, to: toid })
            .populate("from")
            .populate("to")
            .exec()
}