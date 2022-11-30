/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>follows</li>
 *     <li>bookmarks</li>
 *     <li>messages</li>
 * </ul>
 * 
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */

import express, { Request, Response } from 'express';
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from './controllers/FollowController';
import BookmarkController from './controllers/BookmarkController';
import MessageController from './controllers/MessageController';
import AuthenticationController from "./controllers/auth-controller";
import DislikeController from "./controllers/DislikeController";
import mongoose from "mongoose";
const session = require("express-session");

var cors = require('cors')
require('dotenv').config();
// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = "cluster0.wzzajgf.mongodb.net";
const DB_NAME = "tuiter";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
// connect to the database
mongoose.connect(connectionString);
const app = express();
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json());
// Creates the session middleware.
let sess = {
    secret: process.env.SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        // Enables cross-site delivery between Netlify and Heroku.
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax'
    }
}
// Using default env variable on Heroku
if (process.env.NODE_ENV == 'production') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}
app.use(session(sess));


app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Tuiter!'));
// create RESTful Web service API
const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);
const authController = AuthenticationController.getInstance(app);
const dislikesController = DislikeController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);