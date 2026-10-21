import { AuthView } from "@neondatabase/auth-ui";
import { authViewPaths } from "@neondatabase/auth-ui/server";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(authViewPaths).map((path) => ({ path }));
}

export default async function AuthPage({ params }) {
  const { path } = await params;

  return (
    <main className="flex min-h-screen items-center justify-center bg-linen p-4">
      <div className="w-full max-w-md rounded-3xl bg-paper p-6 shadow-xl">
        <AuthView path={path} />
      </div>
    </main>
  );
}
