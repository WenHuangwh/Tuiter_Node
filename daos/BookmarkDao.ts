/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";
/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} BookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static BookmarkDao: BookmarkDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.BookmarkDao === null) {
            BookmarkDao.BookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.BookmarkDao;
    }

    private constructor() { }

    /**
     * Uses BookmarkMoel to create new bookmark documents in bookmark collection
     * @param {string} uid User id
     * @param {string} tid Tuit id
     * @returns New Bookmark
     */
    bookmarkTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({ bookmarkedBy: uid, bookmarkedTuit: tid })

    /**
     * Uses BookmarkMoel to delete a bookmark documents in bookmark collection
     * @param {string} uid User id
     * @param {string} tid Tuit id
     * @returns Delete status
     */
    unbookmarkTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({ bookmarkedBy: uid, bookmarkedTuit: tid })

    /**
     * Use BookmarkMoel to retrieve all bookmarks of a user
     * @param {string} uid User id
     * @returns Bookmark array
     */
    findAllBookmarkByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({ bookmarkedBy: uid })
            .populate('bookmarkedTuit')
            .exec()
    /**
     * Use BookmarkMoel to retrieve all bookmarks to a Tuit
     * @param {string} tid Tuit id
     * @returns Bookmark array
     */
    findAllBookMarkByTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({ bookmarkedTuit: tid })
            .populate('bookmarkedBy')
            .exec()
}