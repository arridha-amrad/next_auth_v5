import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

function SigninForm() {
  return (
    <form action="">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
    </form>
  );
}

export default SigninForm;
