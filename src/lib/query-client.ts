import { cache } from "react";
import { MutationCache, QueryCache, QueryClient, QueryClientConfig } from "@tanstack/react-query";
import { toast } from "sonner";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export const queryClientConfig: QueryClientConfig = {
  mutationCache: new MutationCache({
    onError: (err) => {
      if (err instanceof ZodError) {
        const zodErr = fromZodError(err);
        toast.error(zodErr.message);
      }
    },
  }),
  queryCache: new QueryCache({
    onError: (err) => {
      if (err instanceof ZodError) {
        const zodErr = fromZodError(err);
        toast.error(zodErr.message);
      }
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
};

export const getQueryClient = cache(() => new QueryClient(queryClientConfig));
