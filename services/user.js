const bcrypt = require('bcrypt');
const { ObjectID } = require('mongodb');

const config = require('../config');
const db = require('../db');
const userSchema = require('../schema/user.schema');
const TokenService = require('./token');

const SALT_ROUNDS = config.tokenRounds;
const SECRET = config.tokenSecret;
const COLLECTION_NAME = 'users';

class UserService {
  collection = db.collection(COLLECTION_NAME);

  constructor() {
    this.tokenService = new TokenService();
    this.runValidation();
  }

  async runValidation() {
    db.command({
      collMod: COLLECTION_NAME,
      validator: userSchema
    });

    this.collection.createIndex({ email: 1 }, { unique: true });
  }

  async register(userData) {
    let user;
    try {
      userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
      user = await this.collection.insertOne(userData);
      const token = this.tokenService.generateJwtToken(user);
      this.saveUserToken(user, token);
    } catch(e) {
      throw new Error(e);
    }
    
    return user.ops;
  }

  async login(email, password) {
    let user;
    let token;
    let isMatch;
    try {
      user = await this.collection.findOne({ email });
      if (!user) {
        throw new Error();
      }
      
      isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
        token = this.tokenService.generateJwtToken(user);
        await this.saveUserToken(user, token);
      } else {
        throw new Error();
      }

    } catch(e) {
      console.log(e)
      throw new Error('Login Failed');
    }

    return token;
  }

  async saveUserToken(user, token) {
    return this.collection.updateOne(
      { _id: user._id },
      {
        $push: 
        {
          tokens: token
        }
      }
    );
  }

  async getUser(user) {
    return this.collection.findOne(user);
  }

  async isAuthenticated(token) {
    const decodedToken = this.tokenService.verifyToken(token);
    const user = await this.getUser(
      {
        _id: new ObjectID(decodedToken._id),
        tokens: token
      }
    );
    return user ? user : false;
  }

};

module.exports = UserService;