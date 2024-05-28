import Image from "next/image";
import UpdateUserForm from "~/components/Form/UpdateUserForm";
import getSession from "~/utils/getSession";

export default async function Page() {
  const session = await getSession();
  return (
    <main className="container mx-auto">
      {/* {JSON.stringify(session)} */}
      <section className="flex flex-col gap-3 items-center justify-center w-full">
        {session ? (
          <>
            <h1 className="text-5xl font-bold mb-10">
              Hello, {session?.user.name}
            </h1>
            {session?.user.image && (
              <Image
                width={100}
                height={100}
                className="w-40 object-cover aspect-square rounded-full"
                src={session?.user.image}
                alt="avatar"
              />
            )}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              {session?.user.email}
            </code>
          </>
        ) : (
          <h1 className="text-5xl font-bold">UnAuthenticated</h1>
        )}
      </section>
      {session && (
        <section className="w-full mt-20 flex justify-center">
          <UpdateUserForm />
        </section>
      )}
    </main>
  );
}
