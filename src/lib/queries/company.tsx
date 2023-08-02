import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { UpdateCompanyBody } from "@/app/api/company/[id]/route";
import {
  CreateCompanyBody,
  GetCompanyListQuery,
} from "@/app/api/company/route";

namespace Template {
  export const useGetListQuery = (name: string, query: Record<string, any>) =>
    useQuery(
      [name, "list", ...Object.entries(query).map((p) => `${p[0]}=${p[1]}`)],
      async () =>
        await axios
          .get(`/api/${name}`, {
            params: query,
          })
          .then((res) => res.data)
    );

  export const useGetItemQuery = (name: string, id?: number) =>
    useQuery(
      [name, "item", id],
      async () => await axios.get(`/api/${name}/${id}`).then((res) => res.data),
      {
        enabled: id !== undefined,
      }
    );

  export const useCreateMutation = <T,>(name: string) => {
    const queryClient = useQueryClient();

    return useMutation(
      async (params: { data: T }) =>
        await axios.post(`/api/${name}`, params.data).then((res) => res.data),
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries([name]);
        },
      }
    );
  };

  export const useUpdateMutation = <T,>(name: string) => {
    const queryClient = useQueryClient();

    return useMutation(
      async (params: { id: number; data: T }) =>
        await axios
          .put(`/api/${name}/${params.id}`, params.data)
          .then((res) => res.data),
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries([name]);
        },
      }
    );
  };
}

export const useGetCompanyList = (query: GetCompanyListQuery) =>
  Template.useGetListQuery("company", query ?? {});
export const useGetCompanyItem = (params: { id?: number }) =>
  Template.useGetItemQuery("company", params.id);
export const useCreateCompany = () =>
  Template.useCreateMutation<CreateCompanyBody>("company");
export const useUpdateCompany = () =>
  Template.useUpdateMutation<UpdateCompanyBody>("company");