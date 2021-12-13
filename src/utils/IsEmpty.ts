/**
 * Checks whether a string/object is empty/null/undefined
 * @param value 
 * @returns boolean
 */
export const isEmpty = (value): boolean =>{
    return(
        value === undefined || 
        value === null || 
        (typeof value === 'object' && Object.keys(value).length === 0) || 
        (typeof value === 'string' && value.trim().length === 0)
    );
}
