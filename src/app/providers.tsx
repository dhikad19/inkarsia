"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ReactNode, useState, useEffect } from "react";
import { createContext, useContext } from "react";

const UserContext = createContext<any>(null);

function UserProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id && !user) {
      fetch(`/api/users/${session.user.id}`)
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, [status, session, user]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

export default function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>{children}</UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
