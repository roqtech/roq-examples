import { FileService } from '@/services/file.service';
import { join } from 'path';
import { NextFunction, Response } from 'express';

export default class FilesController {
  async uploadFile(req, res: Response, next: NextFunction) {
    try {
      if (req.isAuthenticated()) {
        const { roqUserId: userId } = req.user;
        const { fileUploadResponse } = await FileService.uploadStaticFile(join(__dirname, '../../', 'public/brand-big.svg'), userId);
        const { file } = await FileService.file(userId, fileUploadResponse.id);
        res.status(200).json(file);
      } else {
        res.sendStatus(401);
      }
    } catch (e) {
      console.error(e);
      res.status(200).json({ files: [], totalCount: 0 });
    }
  }
}
