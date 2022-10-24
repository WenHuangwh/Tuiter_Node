/**
 * @file Declares Follow data type representing relationship between
 * users, as in user follows another user
 */
 import User from "../users/User";
 
 /**
  * @typedef Follow Represents follow relationship between users,
  * as in a user follows another user
  * @property {User} userFollowed User are followd by another user
  * @property {User} userFollowing User follows another user
  */
 
 export default interface Follow {
     userFollowed: User,
     userFollowing: User
 };