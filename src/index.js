const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/server-config');
const apiRoutes =  require('./routes/index');

//const UserService = require('./services/user-service');
//const UserRepository = require('./repository/user-repository');

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server Started on PORT: ${PORT}`);

         //const service = new UserService();
        // const newToken = service.createToken({email: 'ayushsunilraj@gmail.com', id: 1})
        // console.log("new token is", newToken);

        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5dXNoc3VuaWxyYWpAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTY5ODQ4ODk0NSwiZXhwIjoxNjk4NDkyNTQ1fQ.POz_rNPsLDTK4gwUYmkaa1rCxG6yZlYtUjUleOYNlIA'
        // const response = service.verifyToken(token);
        // console.log(response);
    });
}

prepareAndStartServer(); 