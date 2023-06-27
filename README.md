# MongoDB_with_Nodejs

A basic project to understand the connection between MongoDB and Node js application using MongoDB driver. It consists of the creation of an Express app, then creating routes for the CRUD operations, and the use of controllers to communicate with the database and define responses for the client making requests to the server.

The database used in this project is a local one. However, remote MongoDB database service like ATLAS can also be used by just changing the connection string in the db.js file.

The CRUD functions are written in a 'bookController.js' which are then used by a routes file 'books.js'. The 'books.js' uses Express Router which is then used in 'app.js' for the routes.

The project also handles pagination. The pagination logic is written in the getBooks method of bookController.js to get limited number of books per page as per the Query Params.


To start the project, clone the repo first and run the following command in terminal:

npm install

and then:

npm nodemon app

to start the express app

You'll also need to install the nodemon first before executing the above command.