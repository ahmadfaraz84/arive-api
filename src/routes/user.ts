import express from 'express';
import { createUser, deleteOneUser, readOneUser, readAllUsers, deleteAllUsers, updateUser } from '../controllers/user';
import HttpStatus from '../utils/Enums';
const userRouter = express.Router();


/**
 * Requests coming at /user route
 */
userRouter.route('/')
    .get(readAllUsers)
    .post(createUser)
    .put((req, res) => res.status(HttpStatus.MethodNotAllowed).send({success: false, error: 'Method not allowed'}))
    .delete(deleteAllUsers);
/**
 * Requests coming at /user/:_id route
 */
userRouter.route('/:_id')
    .get(readOneUser)
    .post((req, res) => res.status(HttpStatus.MethodNotAllowed).send({success: false, error: 'Method not allowed'}))
    .delete(deleteOneUser)
    .put(updateUser);

export default userRouter;