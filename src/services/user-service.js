const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {JWT_KEY} = require('../config/server-config');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
           const user = await this.userRepository.create(data);
           return user; 
        } catch (error) {
            console.log("something went wrong in the service layer");
            throw error;
        }
    }

    createToken(user) {
        try {
           const result = jwt.sign(user,JWT_KEY, {expiresIn: '1h'});
           return result; 
        } catch (error) {
            console.log("Something went wrong on token creation");
            throw error;
        }
    }

    verifyToken(token) {
        try {
           const response = jwt.verify(token, JWT_KEY);
           return response; 
        } catch (error) {
            console.log("Something went wrong on token validation", error);
            throw error;
        }
    }

    checkPassword(userInputPlanePassword, encryptedPassword) {
        try {
           return bcrypt.compareSync(userInputPlanePassword, encryptedPassword); 
        } catch (error) {
            console.log("Something went wrong in password comparision");
            throw error;
        }
    }
}

module.exports = UserService;

