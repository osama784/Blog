# Blog API

Nodejs app that handles Blogs CRUD operations with authentication and permissions for users 🔥

> [!NOTE] </br>
> I'm using some environment variables like the DATABASE_URI to connect to mongoDB and SESSION_SECRET, create your own and connect to it to be able to run the app.

## Tools:

-   Core Libraries:

    -   Expressjs : handling API endpoints.
    -   Mongoose : connecting to MongoDB, creating schemas (Blog and User).

-   Additional libraries: express-session, connect-mongo (session store), passport (local authentication using sessions), winston (logging), etc.

## General Idea:

-   Enabling users to create their own blogs and editing it while they're authenticated.
-   Using MVC model: controllers, models.
-   Middlwares and Routers for CRUD operations on users and blogs, and for authentication.

## Installing the app:

run these commands to be able to run the app:

```
> git clone https://github.com/osama784/Blog.git
> cd Blog
> npm i
```

after that, create your own `.env` file and add the variables `DATABASE_URI` and `SESSION_SECRET` to it, then run:

```
> npm build
> npm start
```

Now you have the app on your local machine ❤️

<br>
</hr>

### Hope you get some benefits from this project❤️

### [My Portfolio](https://portfolio-osama784s-projects.vercel.app/)
