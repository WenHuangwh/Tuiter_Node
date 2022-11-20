/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";
/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} LikeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() { }
    /**
     * Use LikeModel to retrieve all users that likes a tuit
     * @param {string} tid Tuit id
     * @returns User array
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({ tuit: tid })
            .populate("likedBy")
            .exec();
    /**
     * Use LikeModel to retrieve all tuits liked by a user
     * @param {string} uid User uid
     * @returns Tuit array
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({ likedBy: uid })
            .populate("tuit")
            .exec();
    /**
     * Use LikeModel to create a new Like
     * @param {string} uid User uid
     * @param {string} tid Tuit tid
     * @returns A new Tuit
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({ tuit: tid, likedBy: uid });

    /**
     * Use LikeModel to delete a Like
     * @param {string} uid User uid
     * @param {string} tid Tuit tid
     * @returns Delete status
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({ tuit: tid, likedBy: uid });


    findUserLikesTuit =
        async (uid: string, tid: string) =>
            LikeModel.findOne(
                { tuit: tid, likedBy: uid });

    countHowManyLikedTuit =
        async (tid: string) =>
            LikeModel.count({ tuit: tid });
}