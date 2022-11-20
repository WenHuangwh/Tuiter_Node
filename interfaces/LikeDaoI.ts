import Like from "../models/likes/Like";
import User from "../models/users/User";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface LikeDaoI {
    findAllUsersThatLikedTuit(tid: string): Promise<Like[]>;
    findAllTuitsLikedByUser(uid: string): Promise<Like[]>;
    userUnlikesTuit(tid: string, uid: string): Promise<any>;
    userLikesTuit(tid: string, uid: string): Promise<Like>;
    findUserLikesTuit(tid: string, uid: string): Promise<any>;
    countHowManyLikedTuit(tid: string): Promise<any>;
};