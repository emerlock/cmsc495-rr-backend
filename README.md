---/* || DEPENDENCIES INSTALLED ON BACKEND */---

- (Production)
Express.js ~ (Fast, Unopinionated Node.js web framework.) ~ https://expressjs.com/ 
Mongoose ~ (ODM for interacting with MongoDB on Node.js.) ~ https://mongoosejs.com/ 
CORS ~ (Cors Middleware for Express.js.) ~ https://www.npmjs.com/package/cors 
Dotenv ~ (Populates process.env with your .env file.) ~ https://www.npmjs.com/package/dotenv 
Bcrypt ~ (Used for the password hashing and salting.) ~ https://www.npmjs.com/package/bcrypt 
Jsonwebtoken (JWT) ~ (Used to sign a JWT for the frontend to use on subsequent requests.) ~ https://www.npmjs.com/package/jsonwebtoken 
PassportJS ~ (Authentication middleware that utilizes strategies to authenticate users into applications.) ~ https://www.passportjs.org/ 
Passport-JWT ~ (The specific authentication strategy used in this application. Uses the JWT module under the hood to verify the JWT coming from the Client/Browser to the API.) ~ https://www.passportjs.org/packages/passport-jwt/ 

- (Dev)
nodemon ~ (Automated server restart) ~ https://www.npmjs.com/package/nodemon 

---/* || To install dependencies when you download/clone repo from github */---

- run the command "npm install" in terminal 

---/* || Scripts included ON BACKEND */---

- (To run the script named "start" in package.json)
  1. In the terminal, run the command "npm start" within the directory that contains the package.json file.

- (To run the script named "start-dev" in package.json)

  1. In the terminal, run the command "npm run start-dev" within the directory that contains the package.json file 
  2. -(I included this script so that you do not need to restart the server after everytime you make a change)

- (To run any other script you define in package.json)
npm run <script name> in the terminal

---/* || About BACKEND */---

- This is the backend for the Recipe Redux Application, if you wish to check it out the backend,
    1. Use the command "npm run start-dev" in the backend directory.
    2. This is an API intended to be used with the Recipe Redux Application, 
        -If you would like to test this API it is recommended to use an application, such as POSTMAN, or VSCode extension such as Thunderclient.
        -Ensure that you are testing this API on port 4000, or a port specified through your .env file.
    3. API routes such as /api/recipes may be protected by passport-jwt, in an application such as POSTMAN, you will need to go through the authentication route first. 

- This API has been organized with MVC. 
    1. The route handlers for a specific route will be in the "controllers" directory.
    2. Anything to do with interacting with the MongoDB database will come from the "models" directory.
    3. The views will come from the frontend (React) application. 

- Some Middleware examples from app.js:
    1. express.json()/express.urlencoded() - used for populating req.body with json/form data when we will receive a request from the client (recipe data).
    2. cors() - Allows React app to make HTTP requests to this API.
    3. passport.initialize() - Applying the authentication Middleware so protect our routes.
    4. Simple log middleware to see information about an incoming HTTP request.