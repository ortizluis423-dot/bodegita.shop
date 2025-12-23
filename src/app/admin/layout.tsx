import AuthGuard from "@/components/auth-guard";
import { Providers } from "@/components/providers";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <AuthGuard>{children}</AuthGuard>
    </Providers>
  );
}
