import express from "express";
import User from "../models/user";
import HttpStatus from "../utils/Enums";
import { Validator } from "../utils/validator";


/**
 * Callback for user POST endpoint
 * creates a user
 * @param req 
 * @param res 
 * @returns 
 */
export const createUser = async (req: express.Request, res: express.Response)=>{
    const {errors, isValid} = Validator.validateUser(req.body);
    if(!isValid){
        return res.status(HttpStatus.BadRequest).send({success: false, error: errors.message});
    }
    try {
        const userObject = req.body;
        const newuser = await User.create(userObject);
        return res.status(HttpStatus.created).send({success: true, data: newuser});
    } catch (error) {
        return res.status(HttpStatus.InternalServerError).send({success: false, error: error.message});
    }
}

/**
 * Callback for user GET endpoint. 
 * Returns a user against an _id
 * @param req 
 * @param res 
 * @returns 
 */
export const readOneUser = async (req: express.Request, res: express.Response)=>{
    try {
        const filter = { _id: req.params._id };
        await User.findOne(filter)
        .then((data)=>{
            return res.status(HttpStatus.OK).send({success: true, user: data});
        })
        .catch((err)=>{
            return res.status(HttpStatus.InternalServerError).send({success: false, error: err.message});
        })
    } catch (error) {
        return res.status(HttpStatus.InternalServerError).send({success: false, error: error.message});
    }
}

/**
 * Callback for user GET endpoint. 
 * Returns all users
 * @param req 
 * @param res 
 * @returns 
 */
export const readAllUsers = async (req: express.Request, res: express.Response)=>{
    try {
        await User.find()
        .then((data)=>{
            return res.status(HttpStatus.OK).send({success: true, data: data});
        })
        .catch((err)=>{
            return res.status(HttpStatus.InternalServerError).send({success: false, error: err.message});
        })
    } catch (error) {
        return res.status(HttpStatus.InternalServerError).send({success: false, error: error.message});
    }
}

/**
 * Callback for user DELETE endpoint.
 * Deletes a user agianst an id. Deletion of referenced hobby ids is being managed using moongose 'deletOne' middleware
 * See models/user.ts for reference
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteOneUser = async (req: express.Request, res: express.Response)=>{
    try {
        const filter = { _id: req.params._id };
        await User.findOneAndDelete(filter)
        .then(async ()=>{
            return res.status(HttpStatus.NoContent).end();
        })
        .catch((err)=>{
            return res.status(HttpStatus.InternalServerError).send({success: false, error: err.message});
        })
    } catch (error) {
        return res.status(HttpStatus.InternalServerError).send({success: false, error: error.message});
    }
}

/**
 * Callback for user DELETE endpoint.
 * Deletes all users. After successfull deletion of all users, all the hobbies are also deleted using mongoose 'deleteMany' middleware
 * See models/user.ts for reference
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteAllUsers = async (req: express.Request, res: express.Response)=>{
    try {
        await User.deleteMany({})
        .then(async ()=>{
            return res.status(HttpStatus.NoContent).end();
        })
        .catch((err)=>{
            return res.status(HttpStatus.InternalServerError).send({success: false, error: err.message});
        })
    } catch (error) {
        return res.status(HttpStatus.InternalServerError).send({success: false, error: error.message});
    }
}

/**
 * Callback for user PUT endpoint.
 * Updates a user agianst an id. 
 * @param req 
 * @param res 
 * @returns 
 */
export const updateUser = async (req: express.Request, res: express.Response)=>{
    try {
        const filter = { _id: req.params._id };
        const updatedUserobject = req.body;
        await User.findOneAndUpdate(filter, updatedUserobject, {new: true, useFindAndModify: false})
        .then((data)=>{
            return res.status(HttpStatus.created).send({success: true, user: data});
        })
        .catch((err)=>{
            return res.status(HttpStatus.InternalServerError).send({success: false, error: err.message});
        })
    } catch (error) {
        return res.status(HttpStatus.InternalServerError).send({success: false, error: error.message});
    }
}

