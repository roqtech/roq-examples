import { roqClient } from '../roq';
import { FileUploadResponseType } from '@roq/nodejs/dist/src/fileClient/types/file-upload-response.type';
import fs from 'fs';
import { FileQuery } from '@roq/nodejs/dist/src/generated/sdk';

export class FileService {
  static async getFilesForFeed(currentUserId: string, category: string, limit = 10, offset = 0) {
    const filesResult = await roqClient.asUser(currentUserId).files({
      filter: {
        fileCategory: { equalTo: category },
      },
      limit,
      offset,
      withCreatedByUser: true,
    });

    // Remove emails and other private information from the nested users
    const filesClean = filesResult.files?.data?.map(f => {
      return {
        ...f,
        createdByUser: {
          firstName: f.createdByUser?.firstName,
          lastName: f.createdByUser?.lastName,
        },
      };
    });

    return {
      files: filesClean,
      totalCount: filesResult?.files?.totalCount,
    };
  }

  static file(userId: string, fileId: string): Promise<FileQuery> {
    return roqClient.asUser(userId).file({
      id: fileId,
    });
  }

  static async uploadStaticFile(filePath: string, userId: string): Promise<FileUploadResponseType> {
    const file = fs.readFileSync(filePath);
    return roqClient.asUser(userId).uploadFile({
      fileInfo: {
        file,
        contentType: 'image/svg+xml',
        name: 'brand-big.svg',
        fileCategory: 'USER_FILES',
      },
    });
  }
}
