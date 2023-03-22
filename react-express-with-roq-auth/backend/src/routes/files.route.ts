import { Router } from 'express';
import FilesController from '@controllers/files.controller';
import { Routes } from '@interfaces/routes.interface';
import { requireAuth } from '@roq/expressjs';

class FilesRoute implements Routes {
  public path = '/api/files';
  public router = Router();
  public filesController = new FilesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/upload-static-file`, requireAuth, this.filesController.uploadFile.bind(this.filesController));
  }
}

export default FilesRoute;
