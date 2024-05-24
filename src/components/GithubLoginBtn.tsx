import { Button } from "./ui/button";
import { CatIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { signIn } from "~/auth";

function GithubLoginButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/" });
            }}
          >
            <Button variant="outline" type="submit" size="icon">
              <CatIcon className="w-5 h-5" />
            </Button>
          </form>
        </TooltipTrigger>
        <TooltipContent>
          <p>Login With Github</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default GithubLoginButton;
