import { Request, Response } from "express";

/**
 * @file Declares API for Message related methods
 */
export default interface MessageControllerI {
    sendMessage(req: Request, res: Response): void;
    deleteMessage(req: Request, res: Response): void;
    findAllMessageUserSend(req: Request, res: Response): void;
    findAllMessageUserReceive(req: Request, res: Response): void;
    findMessageUserSendToAnotherUser(req: Request, res: Response): void;
};