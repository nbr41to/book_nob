import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ToggleTheme } from "./components/ToggleTheme";
import { Notifications as MantineNotifications } from "@mantine/notifications";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import { GlobalCartIcon } from "./components/GlobalCartIcon";
import { getUserRole } from "@/server/clerk/metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BOOK^NOB 📚",
  description: "世界最大の本サイト",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  const isLoggedIn = !!userId;

  const role = await getUserRole(userId);
  const isAdmin = !!userId && role === "admin";

  return (
    <ClerkProvider>
      <html lang="ja">
        <head>
          <ColorSchemeScript defaultColorScheme="dark" />
        </head>
        <body className={`${inter.className} min-h-[100dvh]`}>
          <MantineProvider defaultColorScheme="dark">
            <MantineNotifications position="top-center" />
            <header className="flex h-16 items-center justify-between border-b px-4 py-3">
              <div className="flex items-end gap-4">
                <Link className="group text-2xl font-bold" href="/">
                  <h1>
                    <span className="group-hover:hidden">😋 </span>
                    <span className="hidden group-hover:inline">🎃 </span>
                    BOOK^NOB 📚
                  </h1>
                </Link>
                <div className="space-x-4 font-bold">
                  <Link
                    className="inline-block hover:-translate-y-[2px]"
                    href="/books"
                  >
                    Books
                  </Link>
                  {/* LoggedIn Menu */}
                  {isLoggedIn && (
                    <Link
                      className="inline-block hover:-translate-y-[2px]"
                      href="/mypage"
                    >
                      MyPage
                    </Link>
                  )}
                  {/* Admin Menu */}
                  {isAdmin && (
                    <div className="inline-flex space-x-4">
                      <div className="border-l pl-4">
                        <span className="font-normal opacity-60">Admin</span>
                      </div>
                      <Link
                        className="inline-block hover:-translate-y-[2px]"
                        href="/admin/categories"
                      >
                        Categories
                      </Link>
                      <Link
                        className="inline-block hover:-translate-y-[2px]"
                        href="/admin/books"
                      >
                        Books
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {isLoggedIn ? (
                  <>
                    <GlobalCartIcon />
                    <UserButton afterSignOutUrl="/" />
                  </>
                ) : (
                  <Link className="inline-block font-bold" href="/login">
                    Sign Up / Login
                  </Link>
                )}
                <ToggleTheme />
              </div>
            </header>

            <main className="p-8">{children}</main>

            <footer className="sticky top-full grid h-8 place-content-center border-t font-bold">
              © progLearning
            </footer>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
