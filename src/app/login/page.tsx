import { SignIn, SignUp, UserButton, auth } from "@clerk/nextjs";

export default async function Page() {
  const user = auth();

  return (
    <div className="">
      <UserButton afterSignOutUrl="/" />
      <SignUp />
      <SignIn />
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
    </div>
  );
}
