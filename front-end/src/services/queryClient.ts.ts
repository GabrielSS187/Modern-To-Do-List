import {
  dehydrate,
  QueryClient,
  useQuery,
  useMutation,
  useQueryClient
} from "react-query";

export const queryClientObj = {
  queryClient: QueryClient,
  dehydrate,
  useQuery,
  useMutation,
  useQueryClient,
};