# Game of life

A TypeScript visualization of Conway's Game of Life algorithm.
Pair project implemented during an internship programme in cooperation with #FezMLG (backend).

## What is what

The project is a monorepository composed of the following packages:

- game-of-life (the game of life algorithm) (by Fez)

- backend (the backend app) (by Fez)

- game-of-life-front (the frontend app) (by me)

- interfaces (by us both)

Both apps are hosted on heroku:

FRONTEND: https://game-of-life-vis.herokuapp.com/

BACKEND: https://game-of-life-backend-app.herokuapp.com/

## How to use

Clone the repo, run npm install and you're ready to run the apps locally.

- Serve both:

nx run-many --target=serve --all

- Serve frontend or backend only:

nx serve game-of-life-front

nx serve backend

## Addendum

My version of the algorithm as a separate npm package:

https://www.npmjs.com/package/game-of-life-alg