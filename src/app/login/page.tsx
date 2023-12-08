import { SignIn, SignUp, UserButton, auth } from "@clerk/nextjs";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン | BOOK^NOB 📚",
};

export default async function Page({
  searchParams,
}: {
  searchParams: {
    signup: string;
  };
}) {
  return (
    <div className="grid place-items-center py-20">
      <UserButton afterSignOutUrl="/" />
      {searchParams.signup === "true" ? (
        <SignUp signInUrl="/login" />
      ) : (
        <SignIn signUpUrl="/login?signup=true" />
      )}
    </div>
  );
}
