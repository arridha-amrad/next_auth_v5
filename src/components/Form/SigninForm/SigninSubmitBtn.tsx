"use client";

import { useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";
import { Loader2 } from "lucide-react";

function SigninSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="w-full" type="submit">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  );
}

export default SigninSubmitButton;
