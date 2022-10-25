/**
 * @file Implements DAO managing data storage of messages. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of follows
 * @property {FollowDao} FollowDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() { }
    /**
     * Uses FollowMoel to create new follow documents in follow collection
     * @param {string} uidFollowed User being followed
     * @param {string} uidFollowing User follows other user
     * @returns New Follow
     */
    userFollows = async (uidFollowed: string, uidFollowing: string): Promise<any> =>
        FollowModel.create({ userFollowed: uidFollowed, userFollowing: uidFollowing });
    /**
     * Uses FollowMoel to delete a follow documents in follow collection
     * @param {string} uidFollowed User being followed
     * @param {string} uidFollowing User follows other user
     * @returns Delete status
     */
    userUnfollows = async (uidFollowed: string, uidFollowing: string): Promise<any> =>
        FollowModel.deleteOne({ userFollowed: uidFollowed, userFollowing: uidFollowing })
    /**
     * Use FollowModel to retrieve all followers of a user
     * @param {string} uid User being followed
     * @returns User array
     */
    findAllUsersByFollowedId = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({ userFollowed: uid })
            .populate("userFollowed")
            .populate("userFollowing")
            .exec();
    /**
     * Use FollowModel to retrieve all user's following
     * @param {string} uid User follows other
     * @returns User array
     */
    findAllUsersByFollowingId = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({ userFollowing: uid })
            .populate("userFollowed")
            .populate("userFollowing")
            .exec();
}