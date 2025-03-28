import LoginForm from "~/components/login-form";
import type { Route } from "./+types/login";
import { Link, redirect } from "react-router";
import { authenticator } from "~/lib/authentication";
import { sessionStorage } from "~/lib/cookie-storage";

export async function action({ request }: Route.ActionArgs) {
  const user = await authenticator.authenticate("form", request);

  const session = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );
  session.set("user", user);

  throw redirect("/", {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  });
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );
  const user = session.get("user");
  if (user) throw redirect("/");
  return null;
}

export default function Login() {
  return (
    <>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-white">Login</h1>
        <p className="text-gray-400">
          Enter your credentials to access your account
        </p>
      </div>
      <LoginForm />
      <div className="text-center text-sm text-gray-400">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-blue-400 hover:underline"
        >
          Sign up
        </Link>
      </div>
    </>
  );
}
