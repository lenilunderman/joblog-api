# Job Logger API


The Job Logger application allows users to create, edit, delete, and view job listings of positions that the person applied for work. This application stores information about job placement and facilitate users to keep themselves organized on the job search.

## Important Links
- [Job Logger Client Repo](https://github.com/lenilunderman/joblog-client)
- [Job Logger API Repo](https://github.com/lenilunderman/joblog-api)
- [Deployed Job Logger API](https://radiant-sierra-86306.herokuapp.com)
- [Deployed Job Logger Client](https://lenilunderman.github.io/joblog-client/#/)

## API URL
    production: 'https://radiant-sierra-86306.herokuapp.com',
    development: 'http://localhost:4741'

## Tasks

| Command                | Effect                                                                                                      
|------------------------|-------------------------------------------------------------------------------------------------------------|
| `npm run server`       | Starts a development server with `nodemon` that automatically refreshes when you change something.                                                                                         |
| `npm test`             | Runs automated tests.                                                                                       |
| `npm run debug-server` | Starts the server in debug mode, which will print lots of extra info about what's happening inside the app. |

## API End Points

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|---------------------|
| POST   | `/sign-up`             | `users#signup`      |
| POST   | `/sign-in`             | `users#signin`      |
| DELETE | `/sign-out`            | `users#signout`     |
| PATCH  | `/change-password`     | `users#changepw`    |
| GET    | `/joblisting`          | `joblisting#index`  |
| POST   | `/joblisting`          | `joblisting#create` |
| GET    | `/joblisting/:id`      | `joblisting#showOne`|
| DELETE | `/joblisting/:id`      | `joblisting#delete` |
| PATCH  | `/joblisting/:id`      | `joblisting#update` |

All data returned from API actions is formatted as JSON.

## API Routers
- User routes
- Job Listings routes

## Resources and Attributes

The resource for my application is job listings. The user will be able to create, edit, delete job listings of places that he/she applied to work. A perfect tool to keep a log of job placements. 

## Technologies

- Mongo DB
- Mongoose
- Ajax
- JSON
- Node.JS
- Express
- Passport

## Planning Store

This application came to life after expending numerous hours trying to find applications and websites to keep a log of places that I applied to work. The job logger is a simple tool to track your job search.

#### The process:
This application uses authentication and allows users to create resources inside the website. During the process of development, several tools were used to bring this API to live. Ajax, Mongoose, Express, Passport, and more. The application contains a robust back-end with validations for the user accounts. 

#### Problem Solving:
This application solves the problem of spending hours researching for tools and ways to save your job log search, saves everything in one place, and facilitate your job search.

## User Stories

- As a user I want to sign in/up
- As a user I want to Create a new < resource >
- As a user I want to Read multiple < resources >
- As a user I want to Update a < resource > I own
- As a user I want to Delete a < resource > I own

## ORM Database
![Image of ORM](https://i.imgur.com/EoxpDl4.png)

## Disclaimer

This API may be reset or altered at anytime. The future of this API may not align with the current state and therefore the state your client application expects. If you would like to maintain a version of this API in its current state for your future use, please fork and clone the repository and launch it on heroku.

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
