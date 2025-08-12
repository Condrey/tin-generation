"use client";

import { StaffData } from "@/lib/types";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteStaff, upsertStaff } from "./action";

const queryKey: QueryKey = ["all-staffs"];
export function useStaffMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertStaff,
    async onSuccess(data, variables, context) {
      await queryClient.cancelQueries();
      queryClient.setQueryData<StaffData[]>(queryKey, (oldData) => {
        if (!oldData) return;
        if (variables.id) {
          toast.success(`Successfully updated information for ${data.name}`);
          return oldData.map((d) => (d.id === data.id ? data : d));
        }
        toast.success(`Successfully created information for ${variables.name}`);
        return [data, ...oldData];
      });
    },
    onError(error, variables, context) {
      console.error(error);
      toast.error(
        `Failed to ${
          variables.id ? "update staff information. " : "create staff. "
        } Please try again!`,
      );
    },
  });
}

export function useDeleteStaffMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStaff,
    async onSuccess(data, variables, context) {
      await queryClient.cancelQueries();
      queryClient.setQueryData<StaffData[]>(queryKey, (oldData) => {
        toast.success(`Successfully deleted ${data.name} from the list`);
        return oldData?.filter((d) => d.id !== data.id);
      });
    },
    onError(error, variables, context) {
      console.error(error);
      toast.error(`Failed to delete staff, please try again!`);
    },
  });
}
