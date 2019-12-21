import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './../../models/user.model';
import { Model } from 'mongoose';
import { jwtConstants } from 'src/constants';
var jwt = require('jsonwebtoken');

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User> ) {}

  async registerUser(username: string, password: string) {
    const newUser = new this.userModel({ username, password });
    const savedUser = await newUser.save();
    if (savedUser) return this.generateToken(username, password);
    else {
      return 'error saving user';
    }
  }
  async validateUser(username: string, password: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (user !== null) {
      if (password === user.password)  return this.generateToken(username, password);
      else {
        return 'password incorrect';
      }
    } else {
      return 'no such user';
    }
  }
  async generateToken(username: string, password: string) {
    return {
      token: jwt.sign({ username, password },jwtConstants.secret,{expiresIn: '1h' })
    };
  }
}
