import Follow from "../models/follows/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    userFollows(uidFollowed: string, uidFollowing: string): Promise<Follow>;
    userUnfollows(uidFollowed: string, uidFollowing: string): Promise<any>;
    findAllUsersByFollowedId(uid: string): Promise<Follow[]>;
    findAllUsersByFollowingId(uid: string): Promise<Follow[]>;
};