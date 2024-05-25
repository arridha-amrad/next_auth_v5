"use client";

import { useRef, useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { signupAction } from "~/actions";
import SignupSubmitButton from "./SignupSubmitBtn";
import { useToast } from "~/components/ui/use-toast";

const SignupForm = () => {
  const [isShow, setIsShow] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement | null>(null);

  const action = async (data: FormData) => {
    try {
      await signupAction(data);
      toast({
        title: "Ez pz",
        description: "Your registration is successful",
      });
      formRef.current?.reset();
    } catch (err: any) {
      console.log(err);
      console.log(err.message);
      toast({
        title: "Uh oh! Something went wrong.",
        description: err.message,
      });
    }
  };

  return (
    <Card className="px-4 py-2">
      <CardHeader>
        <CardTitle>SignUp Form</CardTitle>
        <CardDescription>
          Fill the form to register you as a new user
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} className="space-y-4" action={action}>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="text" id="email" name="email" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="imgUrl">Avatar</Label>
            <Input type="text" id="imgUrl" name="image" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type={isShow ? "text" : "password"}
              id="password"
              name="password"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isShow}
              onCheckedChange={() => setIsShow((val) => !val)}
              id="terms"
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show password
            </label>
          </div>
          <SignupSubmitButton />
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
