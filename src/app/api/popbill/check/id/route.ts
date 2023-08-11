import { InternalServerError } from "@/lib/server/error";
import { handleApi } from "@/lib/server/handler";
import { PopbillDefaultResponse } from "@/lib/types/popbill";
import axios from "axios";
import queryString from "query-string";
import { z } from "zod";

const queriesSchema = z.object({
  id: z.string(),
});
export type PopbillCheckIdQuery = z.infer<typeof queriesSchema>;
// export const GET = handleApi<CheckPopbillIdResponse>(async (req, context) => {
//   const search = new URL(req.url).search;
//   const data = await queriesSchema.parseAsync(queryString.parse(search));

//   const result = await new Promise((res, rej) => {
//     axios
//       .get(
//         `${process.env.POPBILL_API_URL}/TaxInvoiceService/CheckID?id=${data.id}`,
//         {
//           params: {
//             ID: data.id,
//           },
//         }
//       )
//       .then((result) => {
//         res(result.data);
//       })
//       .catch((err) => {
//         rej(err);
//       });
//   });

//   if (result instanceof Error) {
//     throw new InternalServerError();
//   }

//   const _result = result as PopbillDefaultResponse;
//   return {
//     isUsed: _result.code === 1,
//   };
// });

export type CheckPopbillIdResponse = {
  isUsed: boolean; // 사용여부
};
