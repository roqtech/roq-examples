import { RoqClient } from "@roq/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { roqClient } from "server/roq";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const users = await roqClient
      .asSuperAdmin()
      .users({ filter: { email: { equalTo: email } } });
    const user = users?.users?.data?.[0];

    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    const { verifyPassword } = await roqClient
      .asSuperAdmin()
      .verifyPassword({ userId: user.id, password });
    if (!verifyPassword) {
      return res.status(400).json({ error: "Invalid Password" });
    }

    const sessionCookie = await RoqClient.getSessionCookie({
      userId: user.id,
      keepLoggedIn: true,
    });

    res.setHeader("set-cookie", [sessionCookie]);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
export default async function userLoginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return handler(req, res);
}
