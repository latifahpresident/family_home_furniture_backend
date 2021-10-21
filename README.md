## Project Overview

####  Backend delpoyed on [Heroku](https://home-furniture-store.herokuapp.com/) <br>

##  Getting started

- Clone this repo
- **yarn install** to install all required dependencies
- **yarn server** to start the local server
- **yarn test** to start server using testing environment

### Backend Built Using:

#### Node.js, Express.js

    * Node.js offers a single free codebase that is fast, easy to learn, and offers multiple modules. Collaborators can quickly get up to speed and easily modify and maintain the code for longterm stability.
    * Express.js allows us to code and customize the back-end to our liking, and gives us more control on what and how the back-end handles requests.
    * There is very detailed documentation available for each.
    * There also widespread community support for Node and Express.

#### PostgreSQL

    * Saves the necessary data in an efficient way
    * Allows for easy queries through JOIN support
    * Allows for very easy deployment
    * Has a great community around it and is future proof / very independent of new trends

#### Product Routes

##  Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

    *  NODE_ENV - set to "development" until ready for "production"
    *  SENDGRID_API_KEY - this is generated in your Sendgrid account
    *  DATABASE_URL - url to your production database when deployed
    *  PORT - Port that you want to serve data on. Defaults to 8900

