import Link from "next/link";
import Login from "./auth/Login";
import LoggedIn from "./auth/LoggedIn";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { userAgent } from "next/server";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  console.log("session: ", session);

  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1 className="font-bold text-lg">my forum</h1>
      </Link>
      <ul className="flex items-center gap-6">
        {!session?.user && <Login />}
        {session?.user && <LoggedIn image={session.user.image || ""} />}
      </ul>
    </nav>
  );
}
