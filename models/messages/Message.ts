/**
 * @file Declares Message data type representing relationship between
 * users, as in user messages another user
 */
 import User from "../users/User";
 
 /**
  * @typedef Message Represents follow relationship between users,
  * as in a user messages another user
  * @property {string} message message content
  * @property {User} to User who receive this message
  * @property {User} from User who send this message
  * @property {Date} sentOn time of this message
  */
 
 export default interface Message {
     message: string,
     to: User,
     from: User,
     sentOn: Date
 };