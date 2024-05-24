import { signOut } from "~/auth";
import { Button } from "./ui/button";
import getSession from "~/utils/getSession";

async function LogoutButton() {
  const session = await getSession();

  const action = async () => {
    "use server";
    await signOut({ redirectTo: "/signin" });
  };

  if (!session) return null;
  return (
    <form action={action}>
      <Button type="submit">Logout</Button>
    </form>
  );
}

export default LogoutButton;
