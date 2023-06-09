import { QueryClient, QueryClientConfig } from "@tanstack/react-query";
import { cache } from "react";

export const queryClientConfig: QueryClientConfig = {};

export const getQueryClient = cache(() => new QueryClient(queryClientConfig));
