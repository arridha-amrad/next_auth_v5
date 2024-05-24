"use client";

import { updateUser } from "~/actions";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

function UpdateUserForm() {
  const { update } = useSession();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const action = async (data: FormData) => {
    const response = await updateUser(data);
    if (response) {
      await update(response[0]);
      formRef.current?.reset();
      router.refresh();
    }
  };
  return (
    <form ref={formRef} className="" action={action}>
      <div className="flex w-full max-w-md items-center space-x-2">
        <Input
          className="text-xl h-20"
          name="name"
          type="text"
          placeholder="新し名前を入力"
        />
        <Button className="h-20 text-xl" type="submit">
          変わる
        </Button>
      </div>
    </form>
  );
}

export default UpdateUserForm;
