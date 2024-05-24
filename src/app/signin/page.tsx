import SigninForm from "~/components/Form/SigninForm";
import GithubLoginButton from "~/components/GithubLoginBtn";
import GoogleLoginButton from "~/components/GoogleLoginBtn";

function Page() {
  return (
    <main className="w-full flex items-center justify-center">
      <div className="w-full max-w-md">
        <SigninForm>
          <GithubLoginButton />
          <GoogleLoginButton />
        </SigninForm>
      </div>
    </main>
  );
}

export default Page;
