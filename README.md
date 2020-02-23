# mern-registration-form
Basic Registration form in MERN stack with reCaptcha

## Project Info
Form contains 3 user inputs - Name, email and password. 
If someone from the same IP address tries to register more than 3 times in a day, they are presented with a captcha (Google Recaptcha). The captcha is validated for all subsequent registrations for that IP address. 
If the provided data is valid, then the user details are stored in a Mongo database.

# Backend
This project uses express and mongoose.
#### [IMP] Create .env file inside backend folder and add your own `MONGO_CONNECTION_STRING` and `RECAPTCHA_SECRET_KEY`

## Available Scripts
In the backend folder, you can run:

### `npm install`

Installs all dependencies in package.json.

### `nodemon server`

Runs the backend app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The server will restart if you make edits.<br />



# Frotend
This frontend project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the frontend folder, you can run:

### `npm install`

Installs all dependencies in package.json.

### `npm start`

Runs the frontend app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
