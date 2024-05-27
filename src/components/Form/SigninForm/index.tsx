"use client";

import { ReactNode, useState } from "react";
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
import SigninSubmitButton from "./SigninSubmitBtn";
import { useToast } from "~/components/ui/use-toast";
import { signinAction } from "~/actions";

type Props = {
  children: ReactNode;
};

const SigninForm = ({ children }: Props) => {
  const [isShow, setIsShow] = useState(false);
  const { toast } = useToast();

  const action = async (data: FormData) => {
    try {
      await signinAction(data);
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
        <CardTitle>SignIn Form</CardTitle>
        <CardDescription>Fill the form to sign you in</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action={action}>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="text" id="email" name="email" />
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
              id="show_password"
            />
            <label
              htmlFor="show_password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show password
            </label>
          </div>
          <SigninSubmitButton />
        </form>
        <div className="pt-10 flex gap-2 items-center justify-center">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default SigninForm;
