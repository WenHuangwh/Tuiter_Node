import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() { }
    userFollows = async (uidFollowed: string, uidFollowing: string): Promise<any> =>
        FollowModel.create({ userFollowed: uidFollowed, userFollowing: uidFollowing });

    userUnfollows = async (uidFollowed: string, uidFollowing: string): Promise<any> =>
        FollowModel.deleteOne({ userFollowed: uidFollowed, userFollowing: uidFollowing })

    findAllUsersByFollowedId = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({ userFollowed: uid })
            .populate("userFollowed")
            .populate("userFollowing")
            .exec();

    findAllUsersByFollowingId = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({ userFollowing: uid })
            .populate("userFollowed")
            .populate("userFollowing")
            .exec();
}