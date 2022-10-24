/**
 * @file Declares Bookmark data type representing relationship between
 * users and tuit, as in user bookmarks a tuit
 */
 import User from "../users/User";
 import Tuit from "../tuits/Tuit";
 /**
  * @typedef Bookmark Represents follow relationship between and tuit, 
  * as in user bookmarks a tuit
  * @property {Tuit} bookmarkedTuit bookmarked Tuit
  * @property {User} bookmarkedBy User who bookmarks a tuit
  */
 
 export default interface Follow {
     bookmarkedTuit: Tuit,
     bookmarkedBy: User
 };