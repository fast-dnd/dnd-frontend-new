import { cache } from "react";
import { QueryClient, QueryClientConfig } from "@tanstack/react-query";

export const queryClientConfig: QueryClientConfig = {};

export const getQueryClient = cache(() => new QueryClient(queryClientConfig));
