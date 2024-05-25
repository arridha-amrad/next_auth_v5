import SignupForm from "~/components/Form/SignupForm";

async function Page() {
  return (
    <main className="w-full flex items-center justify-center">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </main>
  );
}

export default Page;
