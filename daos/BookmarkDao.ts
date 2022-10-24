import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";
export default class BookmarkDao implements BookmarkDaoI {
    private static BookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.BookmarkDao === null) {
            BookmarkDao.BookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.BookmarkDao;
    }

    private constructor() { }

    bookmarkTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({ bookmarkedBy: uid, bookmarkedTuit: tid })

    unbookmarkTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({ bookmarkedBy: uid, bookmarkedTuit: tid })

    findAllBookmarkByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({ bookmarkedBy: uid })
            .populate('bookmarkedTuit')
            .exec()

    findAllBookMarkByTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({ bookmarkedTuit: tid })
            .populate('bookmarkedBy')
            .exec()
}