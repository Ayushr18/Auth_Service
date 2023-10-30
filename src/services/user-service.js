const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {JWT_KEY} = require('../config/server-config');
const AppError = require('../utils/error-handler');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
           const user = await this.userRepository.create(data);
           return user; 
        } catch (error) {
            if(error.name === 'SequelizeValidationError') {
                throw error;
            }
            console.log("something went wrong in the service layer");
           throw error;
        }
    }

    async signIn(email, PlainPassword) {
        try {
           const user = await this.userRepository.getByEmail(email);
           const passwordsMatch = this.checkPassword(PlainPassword, user.password);
           
           if(!passwordsMatch) {
                console.log("Password doesn't match");
                throw {error: 'Incorrect Password'};
            }

            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;

        } catch (error) {
            if(error.name === 'AttributeNotFound') {
                throw error;
            }
            console.log("something went wrong in sign-in process");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: 'Invalid token'}
            }
            const user = await this.userRepository.getById(response.id);
            if(!user) {
                throw {error: 'No user the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("something went wrong in sign-in process");
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

    isAdmin(userId) {
        try {
          return this.userRepository.isAdmin(userId);  
        } catch (error) {
            console.log("Something went wrong in password comparision");
            throw error;  
        }
    }
}

module.exports = UserService;

