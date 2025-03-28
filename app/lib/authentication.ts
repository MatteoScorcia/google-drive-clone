import { redirect } from "react-router";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { users } from "~/lib/mock-data";
import type { User } from "~/models/auth";
import { sessionStorage } from "./cookie-storage";
import { verify, hash, argon2id } from "argon2";
import { v7 as uuidv7 } from "uuid";

const ARGON2_SECRET = process.env.ARGON2_SECRET || "secret-key";

export const authenticator = new Authenticator<User>();
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");

    // TODO: validation
    if (typeof password !== "string")
      throw new Error("Failed to authenticate user");

    const currentUser = users.find((u) => u.email === email);

    if (currentUser === undefined)
      throw new Error("Failed to authenticate user");

    const isValidPassword = await verify(currentUser.hashedPassword, password, {
      secret: Buffer.from(ARGON2_SECRET),
    });

    if (!isValidPassword) throw new Error("Failed to authenticate user");

    return currentUser;
  }),
);

export async function createUser(form: FormData) {
  const name = form.get("name");
  const email = form.get("email");
  const password = form.get("password");

  // TODO: validation
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  )
    throw new Error("Invalid user data");

  const hashedPassword = await hash(password, {
    secret: Buffer.from(ARGON2_SECRET),
    type: argon2id,
    hashLength: 32,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });

  const user: User = {
    id: uuidv7(),
    name: name,
    email: email,
    hashedPassword: hashedPassword,
    storageUsed: 0,
    storageLimit: 15,
  };

  users.push(user);

  return user;
}

export async function authenticateRoute(
  request: Request,
  returnTo: string = "/",
) {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );
  const user = session.get("user");
  if (user) return user;
  if (returnTo) session.set("returnTo", returnTo);
  throw redirect("/login", {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  });
}
