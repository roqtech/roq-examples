import { NotificationTypes } from 'server/enums';
import { roqClient } from 'server/roq';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { UserCreateDto } from '@roq/nodejs/dist/src/generated/sdk';

const prisma = new PrismaClient();

export class UserService {
  static async syncUser(
      email: string,
      roqUserId: string,
      type: string = 'user'
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
    return roqClient.asSuperAdmin().notify({
      notification: {
        key: NotificationTypes.welcome,
        recipients: { userIds: [userId] },
      },
    });
  }

  static async createUser(createUser?: UserCreateDto) {
    const isTenantActive = await roqClient.asSuperAdmin().isTenantActive();
    const tenantId: string | undefined = isTenantActive ? (await roqClient.asSuperAdmin().tenants({
      limit: 1,
    }))?.tenants?.data?.[0]?.id : undefined;
    const user = createUser ? { ...createUser, tenantId } : {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      active: true,
      isOptedIn: true,
      customData: {
        countryCode: 'EN',
        gender: faker.name.gender(),
      },
      reference: randomUUID(),
      tenantId,
    };
    return roqClient.asSuperAdmin().createUser({
      user
    })
  }
}
