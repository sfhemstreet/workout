# Workout

Workout app that stores workouts, has circuit workout clock, save workouts locally as an anonymous user or save to cloud when signed in.

## About

When you open the webpage, the app first checks to see if you are  signed in. If you aren't, it checks to see if it has made an anonymous account for you. If it hasn't, you are given a random user name ad saves you to local storage.

You create, or complete, workouts for stars. If someone saves and/or completes your workout you get a star.

A workout is comprised of exercises and rounds, like a circuit.

Exercises are usually time based, ie 20 seconds max pushups, but can be repetition based too. 

When building a list of exercises for a workout, a user can specify an exercise as a 'Rest' period.

Workouts can be paused, resumed or quit. 


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/example](http://localhost:3000/api/). This endpoint can be edited in `pages/api/example.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
