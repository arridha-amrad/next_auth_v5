import Link from "next/link";
import ThemeButton from "./ThemeBtn";
import LogoutButton from "./LogoutBtn";
import UserButton from "./UserButton";
import getSession from "~/utils/getSession";

async function Navbar() {
  const session = await getSession();
  return (
    <nav className="sticky border rounded-lg flex justify-between top-0 items-center h-14 container mx-auto">
      <div className="space-x-2 flex-1">
        {session === null && (
          <>
            <Link className="hover:underline" href="/signup">
              signup
            </Link>
            <Link className="hover:underline" href="/signin">
              signin
            </Link>
          </>
        )}
      </div>
      <h1 className="flex-1">Next Auth V5@beta</h1>
      <div className="flex items-center gap-2">
        <UserButton />
        <LogoutButton />
        <ThemeButton />
      </div>
    </nav>
  );
}

export default Navbar;
