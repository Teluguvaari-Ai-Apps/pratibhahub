import { useEffect } from "react";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppShell } from "@/components/app-shell";
import { Onboarding, Splash } from "@/components/onboarding";
import { useHub } from "@/lib/store";
import appCss from "../styles.css?url";

const APP_NAME = "PratibaHub";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "PratibaHub — a room for artists, directors, singers, designers, and software people.",
      },
      { name: "theme-color", content: "#0c0c0d" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Outfit:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <RootFrame />
        </AuthProvider>
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            style: {
              background: "#1d1d1f",
              color: "#f2f0ed",
              border: "1px solid #2c2b29",
            },
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

function RootFrame() {
  const hydrated = useHub((s) => s.hydrated);
  const onboarded = useHub((s) => s.onboarded);
  const setHydrated = useHub((s) => s.setHydrated);

  useEffect(() => {
    void Promise.resolve(useHub.persist.rehydrate()).then(() => setHydrated());
  }, [setHydrated]);

  if (!hydrated) return <Splash />;
  if (!onboarded) return <Onboarding />;

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
