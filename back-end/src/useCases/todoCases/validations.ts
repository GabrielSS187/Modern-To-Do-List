import { string, z } from "zod";

export const createRequestSchema = z.object({
  todo: string().trim()
  .min(4, {message: "Todo the minimum number of characters is 4."})
  .max(30, {message: "Todo the maximum number of characters and 30."}),
});

export type TCreateRequest = z.infer<typeof createRequestSchema>;
export type TDeleteRequest = {
  idUser: number;
  idTodo?: number;
  selectTypeDeleteAll?: "deleteAllComplete" | "deleteAllIncomplete";
};
export type TUpdateStatusRequest = {
  idTodo: number;
  status: boolean;
};