import prisma from "@/lib/prisma";
import {
  ConflictError,
  InternalServerError,
  NotFoundError,
} from "@/lib/server/error";
import { handleApi } from "@/lib/server/handler";
import { PopbillDefaultResponse } from "@/lib/types/popbill";
import axios from "axios";
import { z } from "zod";
import queryString from "query-string";

const queriesSchema = z.object({
  companyId: z.string().transform((v) => parseInt(v)),
});
export type PopbillCheckMemberQuery = z.infer<typeof queriesSchema>;
// export const GET = handleApi<CheckPopbillMemberResponse>(
//   async (req, context) => {
//     const search = new URL(req.url).search;
//     const data = await queriesSchema.parseAsync(queryString.parse(search));

//     const company = await prisma.company.findFirst({
//       where: {
//         id: data.companyId,
//         managedById: null,
//       },
//     });
//     if (!company) throw new NotFoundError("존재하지 않는 고객사");
//     if (company.isDeleted) throw new ConflictError("이미 탈퇴 처리된 고객사");

//     const result = await new Promise((res, rej) => {
//       axios
//         .get(
//           `${process.env.POPBILL_API_URL}/TaxinvoiceService/CheckIsMember?companyRegistrationNumber=${company.companyRegistrationNumber}`
//         )
//         .then((result) => {
//           res(result.data);
//         })
//         .catch((err) => {
//           rej(err);
//         });
//     });

//     if (result instanceof Error) {
//       throw new InternalServerError();
//     }

//     const _result = result as PopbillDefaultResponse;
//     return {
//       isMember: _result.code === 1,
//     };
//   }
// );

export type CheckPopbillMemberResponse = {
  isMember: boolean; // 연동여부
};
