# QuizNow for Web

"QuizNow" is a web app that allows users to create quizzes and share them with other users. This project provides the React SPA.
It uses only function components and hooks - no classes. It also uses Redux for state and is styled using React-Bootstrap.

You can try out the app at https://www.makequizzes.online/ (it may not always be available 24/7)

## Features

- Offers various question types, including fill-in-the-blank and multiple choice
- Instant quiz grading and feedback to users
- Can set expiration date for quizzes and restrict access to only specific usernames

## Environment setup

Required environment variables:

- `REACT_APP_API_HOST` - URL where the API is being hosted

## Docker

The Docker image creates a Nginx server that serves the SPA at `/` and proxies paths
starting with `/api` to the production server hosting the API. There's also a `dev`
stage that can be used to run the React development server that will send API requests
to localhost. The image is provided for convenience and is subject to change/may not be indicative of the production deployment.

## Related projects:

- [Node.js back-end](https://github.com/jtaylorsoftware/quizapp-api)
- [Android app](https://github.com/jtaylorsoftware/quizapp-android)
