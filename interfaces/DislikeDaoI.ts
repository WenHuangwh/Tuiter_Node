import Dislike from "../models/dislikes/Dislike";
import User from "../models/users/User";

/**
 * @file Declares API for Dislikes related data access object methods
 */
export default interface LikeDaoI {
    findAllUsersThatDislikedTuit(tid: string): Promise<Dislike[]>;
    findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]>;
    userUnDislikesTuit(tid: string, uid: string): Promise<any>;
    userDislikesTuit(tid: string, uid: string): Promise<Dislike>;
    findUserDislikesTuit(tid: string, uid: string): Promise<any>;
    countHowManyDislikedTuit(tid: string): Promise<any>;
};