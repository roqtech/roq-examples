import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth, getServerSession } from "@roq/nextjs";
import { roqClient } from "server/roq";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Method not allowed" });
    res.end();
  }

  const user = await roqClient.asSuperAdmin().createUser({
    user: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      active: true,
      isOptedIn: true,
      customData: {
        countryCode: "EN",
        gender: faker.name.gender(),
      },
      reference: randomUUID(),
    },
  });
  res.status(200).json({ user: user.createUser });
}

export default function filesHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return withAuth(req, res)(handler);
}
