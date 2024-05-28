import getSession from "~/utils/getSession";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

async function UserButton() {
  const session = await getSession();

  if (!session) return null;
  return (
    <section className="flex gap-2 items-center px-4">
      <Avatar>
        <AvatarImage
          className="object-cover"
          src={session?.user.image ?? undefined}
        />
        <AvatarFallback>
          {session?.user.name
            ?.split(" ")
            .map((word: string) => word.charAt(0).toUpperCase())
            .join("")}
        </AvatarFallback>
      </Avatar>
      <h1 className="whitespace-pre-line text-wrap">{session?.user.name}</h1>
    </section>
  );
}

export default UserButton;
