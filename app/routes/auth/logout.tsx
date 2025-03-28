import type { Route } from "./+types/login";
import { Link, redirect, data } from "react-router";
import { authenticator } from "~/lib/authentication";
import { sessionStorage } from "~/lib/cookie-storage";

export async function action({ request }: Route.ActionArgs) {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );

  return redirect("/", {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
}
