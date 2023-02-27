import UserService from '@/services/users.service';
import { NextFunction, Request, Response } from 'express';

export default class AuthController {
  public userService = new UserService();

  public onAuthorize = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.query);
      console.log(req.body);
      res.send('ok');
    } catch (error) {
      next(error);
    }
  };
}
