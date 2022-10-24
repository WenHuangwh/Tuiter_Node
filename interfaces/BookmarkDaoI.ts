import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @file Declares API for Bookmark related data access object methods
 */
export default interface BookmarkDaoI {
    bookmarkTuit(uid: string, tid: string): Promise<Bookmark>;
    unbookmarkTuit(uid: string, tid: string): Promise<any>;
    findAllBookmarkByUser(uid: string): Promise<Bookmark[]>;
    findAllBookMarkByTuit(tid: string): Promise<Bookmark[]>;
};