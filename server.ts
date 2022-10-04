/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import TuitController from './controllers/TuitController';
import UserController from './controllers/UserController';
import UserDao from './daos/UserDao';
import mongoose from "mongoose";
import TuitDao from './daos/TuitDao';


const cors = require('cors')
const app = express();
mongoose.connect('mongodb://localhost:27017/tuiter');

app.use(cors());
app.use(express.json());

const userController = new UserController(app, new UserDao());
const tuitController = new TuitController(app, new TuitDao());
app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));

app.get('/hello', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!'));
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
