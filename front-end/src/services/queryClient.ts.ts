import { dehydrate, QueryClient, useQuery, useMutation, useQueryClient } from "react-query";

export const queryClientObj = {
  queryClient: new QueryClient(),
  dehydrate,
  useQuery,
  useMutation,
  useQueryClient
};