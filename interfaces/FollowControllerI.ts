import { Request, Response } from "express";

/**
 * @file Declares API for Follow related methods
 */
export default interface FollowControllerI {
    userFollows(req: Request, res: Response): void;
    userUnfollows(req: Request, res: Response): void;
    findAllUsersFollowedByThisUser(req: Request, res: Response): void;
    findAllUsersFollowingThisUser(req: Request, res: Response): void;
};