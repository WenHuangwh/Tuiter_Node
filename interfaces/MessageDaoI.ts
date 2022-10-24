import Message from "../models/messages/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    sendMessage(fromid: string, toid: string, message: string): Promise<Message>;
    deleteMessage(mid: string): Promise<any>;
    findAllMessageUserSend(uid: string): Promise<Message[]>;
    findAllMessageUserReceive(uid: string): Promise<Message[]>;
    findMessageBetweenTwoUsers(fromid: string, toid: string): Promise<Message[]>;
};