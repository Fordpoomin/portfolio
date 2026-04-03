import "server-only";

import { cookies } from "next/headers";

const ADMIN_COOKIE = "portfolio_admin_session";

function expectedCredentials() {
  return {
    username: process.env.ADMIN_USERNAME ?? "admin",
    password: process.env.ADMIN_PASSWORD ?? "admin123"
  };
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  const { username, password } = expectedCredentials();

  return token === `${username}:${password}`;
}

export async function createAdminSession() {
  const cookieStore = await cookies();
  const { username, password } = expectedCredentials();

  cookieStore.set(ADMIN_COOKIE, `${username}:${password}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/"
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export function validateAdminCredentials(username: string, password: string) {
  const expected = expectedCredentials();
  return username === expected.username && password === expected.password;
}
