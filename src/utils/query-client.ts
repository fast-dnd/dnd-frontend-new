import { cache } from "react";
import { QueryClient, QueryClientConfig } from "react-query";

export const queryClientConfig: QueryClientConfig = {};

export const getQueryClient = cache(() => new QueryClient(queryClientConfig));
