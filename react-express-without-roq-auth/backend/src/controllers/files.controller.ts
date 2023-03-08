import { FileService } from '@/services/file.service';
import { join } from 'path';
import { NextFunction, Request, Response } from 'express';
import AuthController from '@controllers/auth.controller';

export default class FilesController {
  async uploadFile(req: Request, res: Response, next: NextFunction) {
    const session = AuthController.getSessionData(req);
    if (!session) {
      return res.status(401).json({ code: 'Forbidden', message: 'User not logged in' });
    }
    try {
      console.log({ session });
      const { roqUserId: userId } = session;
      const { fileUploadResponse } = await FileService.uploadStaticFile(join(__dirname, '../../', 'public/brand-big.svg'), userId);
      const { file } = await FileService.file(userId, fileUploadResponse.id);
      res.status(200).json(file);
    } catch (e) {
      console.error(e);
      res.status(200).json({ files: [], totalCount: 0 });
    }
  }
}
