import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC, ReactNode } from "react";

const queryClient = new QueryClient();

export const QueryProvider: FC<{ children: ReactNode; }> = ({ children }) => <QueryClientProvider client={queryClient} children={children} />;