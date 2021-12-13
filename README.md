# Table of Contents #

- [Arive API](#arive-api)
- [Purpose](#purpose)
- [Prerequisites](#prerequisites)
- [Basic Instructions](#basic-instructions)
- [Code Structure](#code-structure)
- [Comments](#comments)

## Arive API
A backend API for a small app "User Hobbies" (Please do read comments in the last before reviewing code. Thanks !)

## Purpose
To asses and evaluate my abilities for Backend Development


### Prerequisites
- Nodejs v15.x or above
- MongoDB server (Remote or local)
- Port
- Git

### Basic Instructions
1. Clone repository or pull if you already have cloned.
2. `npm install` to install all the packages described in manifest.
3. `cd arive-api` and open `.env` file and provide connection string for mongodb server in `mongoDbURL`. You can change the PORT from here as well.
4. `npm run build` to build the project.
5. `npm run start` to run the project.
6. `npm run dev` to debug.
7. `npm run test` to run tests.
8. `npm run lint` for linting the project.

### Code Structure
I have tried to divide responsibilites hence created different directories for different aspects of application. Source Code is organized in following manner:
- src
  * app.ts : Entry point for application.
  * Controllers
    * Contains business logics, has callbacks for all the endpoints. Interacts with database and returns results back in responce
  * Models
    * Contains the database schemas
  * Routes
    * Contains the routes and manages their callbacks.
  * Test
    * Contains the tests hence. (I have added only three test cases. Could have added more but that could have costed so much time)
  * Utils
    * Has helper functions and miscellaneous modules to use accross application
      * Enums.ts: Contains HTTP Status codes hence to keep consistent acrross app
      * IsEmpty.ts: Function to test whether an object/string is empty/null/undefined.
      * logger.ts: A middleware function for logging HTTP requests.
      * Validator.ts: Class which provides methods for validation of payloads coming from front end.
 - public
    * swagger.json: I have used swagger.json for API documentation. Added only a few API endpoints because it was a manual job and was costing so much time. It could have been managed dynamically but, to be honest I have used it for the first time hence used swagger.json


### Comments
  * I earlier used ts-doc for commenting and documenation. Swagger is new for me, hence you would notice a manual job in creating API documenation. So is the reason that I just added documentation for a few APIs
  * I deliberately wrote very few tests. Idea was to just demonstrate.
  * I used mongodb `refs` for the relationship of user and hobbies and did not push hobbies into user's hobbies attribute just to avoid denormalization and save storage. It could have been done that way but my motive here is to get users data first and the using a user's id fetch all the hobbies of that user and finnaly populate them against that user in the frontend.
  * At the time of deletion of user, all hoobies of that user are being deleted using mongoose `deleteOne` middleware. (see `src/models/user.ts` for reference).