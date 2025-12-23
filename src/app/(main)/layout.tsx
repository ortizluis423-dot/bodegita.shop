import { Header } from "@/components/layout/header";
import { Providers } from "@/components/providers";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </Providers>
  );
}
