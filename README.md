# QuizNow for Web

"QuizNow" is a web app that allows users to create quizzes and share them with other users. This project provides the React SPA.
It uses only function components and hooks - no classes. It also uses Redux for state and is styled using React-Bootstrap.

You can try out the app at http://www.makequizzes.online/ (currently insecure to keep costs low).

## Features

- Offers various question types, including fill-in-the-blank and multiple choice
- Instant quiz grading and feedback to users
- Can set expiration date for quizzes and restrict access to only specific usernames

## Environment setup

Required environment variables:
- `REACT_APP_API_HOST` (URL where the API is being hosted)

## Docker

The Docker image serves the SPA and proxies paths starting with `/api` to the server hosting the
API; this is likely to change as it's currently only provided as a workaround with the limits
of my current hosting setup.

## Related projects:

- [React + Redux SPA](https://github.com/jtaylorsoftware/quizapp-web)
- [Android app](https://github.com/jtaylorsoftware/quizapp-android)

