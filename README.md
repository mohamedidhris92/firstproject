1. create CRED operation with the help of react,redux,node,expressjs and mongodb
2. store the data to redux and read the data
3. after that store the redux data to mongodb with the help of node

how to run
1. in Server folder first of all i created every node and mongodb connection in one component "server.js"
    -> cd project1-->cd Server-->nodemon server.js   this will help the server to run a cred operation in a single component and need to change all server port to "4545".

2. in Server1 folder i created every node and mongodb connection seperatly with the professional method it will
    help to understand in project manner.
    -->cd project1-->cd Server1-->nodemon app.js this will help the server to run a cred operation in a project method and check the server will run in port "4546".

    in this Server1-->app.js
    this file is the main server file to run a server and connect to mongodb and listening port everything
    this will route the path to router

    -->userRoutes.js
    this will help to router the path with the method of "post","get","put" and "delete".

    -->userController.js
    this will help to create a request and response from front end to database this is the middleware and we
    will declare the method of "create","find","delete" like that.

    -->user.js
    this will help to create a schema and model of the database it will create the table here only we declare 
    the table name

