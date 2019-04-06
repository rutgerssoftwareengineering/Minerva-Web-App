This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, to perform tests you must first run:

### `npm install`

This will install the node modules listed in the dependencies in package.json. You may need to run `npm install` in both the /client/ and /backend/ folders before running it in the parent directory. If any dependency issues arise, try deleting package-lock.json and running `npm install` again.

### `npm test`

Once the node modules have been installed, `npm test` can be executed to run the tests that have been created. This is performed using Jest (https://jestjs.io/) and will run files found in folders named 'test' with the file extension '.test.js'. Unit tests will be output with their results to the local console when the command is executed.