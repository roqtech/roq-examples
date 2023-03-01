import { NotificationTypes } from 'server/enums';
import { roqClient } from 'server/roq';
import { PrismaClient } from '@prisma/client';
import { UserCreateDto } from '../dtos/user-create.dto';
import { UserModel } from '@roq/nodejs/dist/src/generated/sdk';

const prisma = new PrismaClient();

export class UserService {

  static async addMetaData(id: string, customData: Record<string, unknown>): Promise<UserModel> {
    const { updateUser: user } = await roqClient.asSuperAdmin().updateUser({
      id: id,
      user: {
        customData,
      },
    });
    return user;
  }

  static async registerAsUser({
                                firstName,
                                lastName,
                                email,
                                reference
                              }: UserCreateDto): Promise<UserModel> {
    const user = await roqClient.asSuperAdmin().createUser({
      user: {
        email,
        firstName,
        lastName,
        isOptedIn: true,
        active: true,
        locale: 'en-US',
        reference,
      }
    });
    return user.createUser;
  }

  static async createToken(roqUserId: string, expiry: string): Promise<string> {
    const rightNow = new Date();
    const expires = new Date(expiry);
    const expiryInSeconds = Math.abs((expires.getTime() - rightNow.getTime()) / 1000);
    return roqClient.authorization.createUserToken(roqUserId, `${expiryInSeconds}s`)
  }

  static async welcomeUser(userId: string) {
    return roqClient.asSuperAdmin().notify({
      notification: {
        key: NotificationTypes.welcome,
        recipients: { userIds: [userId] },
      },
    });
  }
}
