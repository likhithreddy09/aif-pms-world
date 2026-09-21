"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { clearSessionCookie, createSessionToken, sessionCookie } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin/dashboard");

  const user = await db.adminUser.findUnique({ where: { email } });
  if (!user) {
    return { error: "Invalid email or password." };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  const token = await createSessionToken({
    sub: user.id,
    email: user.email,
    name: user.name,
  });
  cookies().set(sessionCookie(token));
  redirect(next.startsWith("/admin") ? next : "/admin/dashboard");
}

export async function logoutAction() {
  cookies().set(clearSessionCookie());
  redirect("/admin/login");
}
