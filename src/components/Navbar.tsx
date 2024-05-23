import Link from "next/link";
import ThemeButton from "./ThemeBtn";

function Navbar() {
  return (
    <nav className="sticky border bg-neutral-900 rounded-lg flex justify-between top-0 items-center h-14 container mx-auto">
      <div className="space-x-2 text-neutral-100 self-center flex-1">
        <Link className="hover:underline" href="/signup">
          signup
        </Link>
        <Link className="hover:underline" href="/signin">
          signin
        </Link>
      </div>
      <h1 className="flex-1">Next Auth V5@beta</h1>
      <ThemeButton />
    </nav>
  );
}

export default Navbar;
