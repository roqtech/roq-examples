import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';
import { requireAuth } from '@roq/expressjs';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, requireAuth, this.usersController.getUsers.bind(this.usersController));
    this.router.get(`${this.path}/:id(\\d+)`, requireAuth, this.usersController.getUserById.bind(this.usersController));
    this.router.post(`/api/welcome`, this.usersController.welcome.bind(this.usersController));
  }
}

export default UsersRoute;
