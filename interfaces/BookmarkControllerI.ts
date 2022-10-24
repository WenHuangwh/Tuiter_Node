import { Request, Response } from "express";

/**
 * @file Declares API for Bookmark related methods
 */
export default interface BookmarkControllerI {
    bookmarkTuit(req: Request, res: Response): void;
    unbookmarkTuit(req: Request, res: Response): void;
    findAllBookmarkByUser(req: Request, res: Response): void;
    findAllBookmarkByTuit(req: Request, res: Response): void;
};