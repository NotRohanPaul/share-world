import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { queryClient } from "./query-client";


export const QueryProvider = ({ children }: PropsWithChildren) => <QueryClientProvider client={queryClient} children={children} />;