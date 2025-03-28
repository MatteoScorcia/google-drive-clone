import SignUpForm from "~/components/signup-form";
import type { Route } from "./+types/signup";
import { Link, redirect } from "react-router";
import { createUser } from "~/lib/authentication";
import { sessionStorage } from "~/lib/cookie-storage";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const user = createUser(formData);

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

export default function SignUp() {
  return (
    <>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-white">Sign Up</h1>
        <p className="text-gray-400">Create a new account to get started</p>
      </div>
      <SignUpForm />
      <div className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-blue-400 hover:underline">
          Login
        </Link>
      </div>
    </>
  );
}
