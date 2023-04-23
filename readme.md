# Mini LWS e-learning platform

Fully functional e-learning platform build with react

**Demo** [Live Preview](https://mini-lws.netlify.app/)

## Directory

-   server
-   client (mini-lws-learning-platform)

## How to start

Go to both directory and run to install the dependencies

```
npm install
```

or

```
yarn add
```

Run server -
`cd server` and run

```
npm start
```

or

```
yarn start
```

The server will run on `http://localhost:9000/`

Run app -
`cd server` and run

```
npm run dev
```

or

```
yarn run dev
```

The app will run on `http://localhost:5173/`

## Login details

Admin
`email: admin@learnwithsumit.com`
`password: lws@123456`

Student
`email: akash.ahmed@learnwithsumit.com`
`password: lws@123456`

## Features

-   Admin login and logout
-   Admin all route will be /admin/\*
-   Admin can Add, Edit and Delete video, assignment, quiz
-   Admin can give assignment mark from `/admin/assignment-mark`
-   Student login, register and logout
-   Student can watch course video
-   Student can submit assignment if any assignment associate with video
-   Student can submit quiz if any quiz associate with video
-   Assignment and quiz can submitted at once
-   Leader board
-   And many more...

## Dependencies

-   @reduxjs/toolkit
-   react-content-loader
-   react-helmet
-   react-redux
-   react-router-dom
-   react-toastify
-   tailwindcss

This is a assignment project for **Think in a redux way** course by [Learn With Sumit](https://learnwithsumit.com/)

Happy coding ❤
