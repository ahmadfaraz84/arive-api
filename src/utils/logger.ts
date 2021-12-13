/**
 * Middleware for logging of Express requests
 * @param req 
 * @param res 
 * @param next 
 */
const mLogger = (req, res, next) => {
	let now = new Date();
	let timeString = `[${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}]`;
	let reqDetails = `    ${req.method}     ${req.url}   `;
	console.log(timeString + reqDetails);
	next();
};

export default mLogger;