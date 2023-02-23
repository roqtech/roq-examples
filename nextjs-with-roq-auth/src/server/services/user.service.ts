import { randomUUID } from "crypto";
import { NotificationTypes } from "server/enums";
import { roqClient } from "server/roq";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  static async syncUser(
    email: string,
    roqUserId: string,
    type: string = "user"
  ) {
    await prisma.user.upsert({
      where: {
        roqUserId,
      },
      update: {},
      create: {
        email: email,
        roqUserId,
        password: "roq4you",
        type,
      },
    });
  }

  static async registerAsBuyer(email: string, roqUserId: string) {
    await this.syncUser(email, roqUserId, "buyer");

    roqClient.asSuperAdmin().updateUser({
      id: roqUserId,
      user: {
        customData: {
          role: "buyer",
        },
      },
    });
  }

  static async registerAsUser(email: string, roqUserId: string) {
    await this.syncUser(email, roqUserId);
  }

  static async welcomeUser(userId: string) {
    roqClient.asSuperAdmin().notify({
      notification: {
        key: NotificationTypes.welcome,
        recipients: { userIds: [userId] },
      },
    });
  }
}
