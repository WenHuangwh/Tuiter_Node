/**
 * @file Implements DAO managing data storage of Dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/DislikesModel";
import Dislike from "../models/dislikes/dislike";
/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} DislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static DislikeDao: DislikeDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.DislikeDao === null) {
            DislikeDao.DislikeDao = new DislikeDao();
        }
        return DislikeDao.DislikeDao;
    }
    private constructor() { }
    /**
     * Use DislikeModel to retrieve all users that Dislikes a tuit
     * @param {string} tid Tuit id
     * @returns User array
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({ tuit: tid })
            .populate("DislikedBy")
            .exec();
    /**
     * Use DislikeModel to retrieve all tuits Disliked by a user
     * @param {string} uid User uid
     * @returns Tuit array
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({ DislikedBy: uid })
            .populate("tuit")
            .exec();
    /**
     * Use DislikeModel to create a new Dislike
     * @param {string} uid User uid
     * @param {string} tid Tuit tid
     * @returns A new Tuit
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({ tuit: tid, DislikedBy: uid });

    /**
     * Use DislikeModel to delete a Dislike
     * @param {string} uid User uid
     * @param {string} tid Tuit tid
     * @returns Delete status
     */
    userUnDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({ tuit: tid, DislikedBy: uid });

    /**
     * Use DislikeModel to check if one user that dislikes this Tuit
     * @param {string} uid User uid
     * @param {string} tid Tuit tid
     * @returns one Dislike
     */
    findUserDislikesTuit =
        async (uid: string, tid: string) =>
            DislikeModel.findOne(
                { tuit: tid, DislikedBy: uid });

    /**
     * Use DislikeModel to count how many users disliked this Tuit
     * @param {string} tid Tuit tid
     * @returns number
     */
    countHowManyDislikedTuit =
        async (tid: string) =>
            DislikeModel.count({ tuit: tid });
}