import express from "express";
import Hobby from "../models/hobby";
import HttpStatus from "../utils/Enums";
import { Validator } from "../utils/validator";

/**
 * Callback for Hobby POST endpoint.
 * creates a hobby. 
 * @param req 
 * @param res 
 * @returns 
 */
export const createHobby = async (req: express.Request, res: express.Response)=>{
    const {errors, isValid} = Validator.validateHobby(req.body);
    if(!isValid){
        return res.status(HttpStatus.BadRequest).send({success: false, error: errors.message});
    }
    try {
        const hobbyObject = req.body;
        const newHobby = await Hobby.create({
            name: hobbyObject.name,
            passionLevel: hobbyObject.passionLevel,
            year: hobbyObject.year,
            owner: hobbyObject.userId
        });
        return res.status(HttpStatus.created).send({success: true, data: newHobby});
    } catch (error) {
        return res.status(HttpStatus.InternalServerError).send({success: false, error: error.message});
    }
}

/**
 * Callback for Hobby GET endpoint
 * Returns all hobbies for a particular user using their _id
 * @param req 
 * @param res 
 * @returns 
 */
export const readAllHobbies = async (req: express.Request, res: express.Response)=>{
    const {errors, isValid} = Validator.validateQueryParams(req.query);
    if(!isValid){
        return res.status(HttpStatus.BadRequest).send({success: false, error: errors.message});
    }
    try {
        const filter = { owner: req.query.owner };
        await Hobby.find(filter)
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
 * Callback for Hobby DELETE endpoint
 * Deletes a hobby. 
 * See sample frontend in shared pdf for reference
 * @param req 
 * @param res 
 * @returns 
 */
export const deleteOneHobby = async (req: express.Request, res: express.Response)=>{
    const {errors, isValid} = Validator.validateQueryParams(req.query);
    if(!isValid){
        return res.status(HttpStatus.BadRequest).send({success: false, error: errors.message});
    }    
    try {
        const filter = { _id: req.query._id };
        await Hobby.deleteOne(filter)
        .then(()=>{
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
 * Callback for Hobby PUT endpoint
 * updates a hobby.
 * @param req 
 * @param res 
 * @returns 
 */
export const updateHobby = async (req: express.Request, res: express.Response)=>{
    const {errors, isValid} = Validator.validateQueryParams(req.body);
    if(!isValid){
        return res.status(HttpStatus.BadRequest).send({success: false, error: errors.message});
    }
    try {
        const filter = { _id: req.query._id };
        const updatedHobbyObject = req.body;
        await Hobby.findOneAndUpdate(filter, updatedHobbyObject, {new: true, useFindAndModify: false})
        .then((data)=>{
            return res.status(HttpStatus.created).send({success: true, hobby: data});
        })
        .catch((err)=>{
            return res.status(HttpStatus.InternalServerError).send({success: false, error: err.message});
        })
    } catch (error) {
        return res.status(HttpStatus.InternalServerError).send({success: false, error: error.message});
    }
}
