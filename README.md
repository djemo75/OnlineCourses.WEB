## Project information:

Platform for online courses with the following features:

- sign in with Google
- managing categories(Contentful panel)
- managing courses(Contentful panel)
- managing lessons by courses(Contentful panel)
- filtering courses by category and level, pagination
- list of favorite courses
- list of favorite lessons
- reviewing courses by customers
- social sharing

## Technologies used

HTML, CSS, JavaScript, React, Next Js, Context API

## Setup and Launch

To run the application, you need to create an .env file in the project folder with the following content and fill in the empty variables:
```
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001
NEXT_PUBLIC_OAUTH_URL=https://accounts.google.com/o/oauth2/v2
NEXT_PUBLIC_OAUTH_CLIENT_ID=
```

Then type the following command in the terminal:
```
npm i && npm run dev
```

## Linked repositories

- OnlineCourses.API - https://github.com/djemo75/OnlineCourses.API
