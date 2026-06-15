import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "./prisma";

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) return null;

  // First login
  if (!user.tenantId) {
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        tenantId: crypto.randomUUID(),
      },
    });

    return updatedUser;
  }

  return user;
}
