import { Metadata } from "next";

export const metadata: Metadata = {
  title: "本の追加 | BOOK^NOB 📚",
};

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div>
      <div>{children}</div>
      {modal}
    </div>
  );
}
