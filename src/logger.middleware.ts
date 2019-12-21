import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { jwtConstants } from './constants';
var jwt = require('jsonwebtoken');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (!req.headers.authorization)
      return res.status(401).send('Unautorized request');
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') return res.status(401).send('Unautorized request');
    let payload = jwt.verify(token,jwtConstants.secret, {ignoreExpiration: true});
    if (!payload) return res.status(401).send('Unautorized request');

    console.log('payload',payload);
    next();
  }
}
