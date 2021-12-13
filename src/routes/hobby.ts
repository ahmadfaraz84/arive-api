import express from 'express';
import { createHobby,  deleteOneHobby, readAllHobbies, updateHobby } from '../controllers/hobby';
const hobbyRouter = express.Router();


/**
 * Requests coming at /hobby route
 */
hobbyRouter.route('/')
    .get(readAllHobbies)
    .post(createHobby)
    .put(updateHobby)
    .delete(deleteOneHobby);


export default hobbyRouter;