import { randomUUID } from "crypto";
import { NotificationTypes } from "server/enums";
import { roqClient } from "server/roq";

export class UserService {
  static async registerAsBuer(email: string, reference: string) {
    return roqClient.asSuperAdmin().createUser({
      user: {
        email,
        reference: randomUUID(),
        customData: {
          isBuyer: true,
        },
      },
    });
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
