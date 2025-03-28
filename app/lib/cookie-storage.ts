import { createCookieSessionStorage } from "react-router";
import { SERVER_ENV } from "~/server/env";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: SERVER_ENV.APP_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
