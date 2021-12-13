import { isEmpty } from "./IsEmpty"


/**
 * The purpose of this class is to validate incoming requests from front end
 */
export class Validator {

    /**
     * Validate Query Params
     * @param data 
     * @returns 
     */
    public static validateQueryParams = (data): any =>{
        const errors = {
            message:""
        }
        if(isEmpty(data)){
            errors.message = "Query Parameters must not be empty"
        }
        return {
            errors,
            isValid: isEmpty(errors.message),
        };
    }
    
    /**
     * Validate body of request in User creation enpoint
     * @param data 
     * @returns 
     */
    public static validateUser = (data: any): any =>{
        let errors = {
            message:""
        }
        if(isEmpty(data.name)){
            errors.message = "User name must not be empty"
        }
        return {
            errors,
            isValid: isEmpty(errors.message),
        };
    }

    /**
     * Validate body of request in Hobby creation enpoint
     * @param data 
     * @returns 
     */
    public static validateHobby = (data: any): any =>{
        let errors = {
            message:""
        }
        if(isEmpty(data.name)){
            errors.message = "Hobby name must not be empty";
        }else if(isEmpty(data.userId)){
            errors.message = "Hobby UserId must not be empty";
        }else if(isEmpty(data.passionLevel)){
            errors.message = "Hobby Passion Level must not be empty";
        }else if(isEmpty(data.year)){
            errors.message = "Hobby Year must not be empty";
        }
        return {
            errors,
            isValid: isEmpty(errors.message),
        };
    }
    
    
}