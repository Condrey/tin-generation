import ResponsiveDrawer from "@/components/responsive-drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { StaffData } from "@/lib/types";
import { staffSchema, StaffSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useStaffMutation } from "./mutation";

interface FormAddEditTinProps {
  staff: StaffData;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function FormAddEditTin({
  staff,
  open,
  setOpen,
}: FormAddEditTinProps) {
  const { isPending, mutate } = useStaffMutation();

  const form = useForm<StaffSchema>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      id: staff?.id || 0,
      employeeNumber: staff?.employeeNumber || "",
      supplierNumber: staff?.supplierNumber || "",
      tin: staff?.tin || "",
      name: staff?.name || "",
    },
  });

  function onSubmit(input: StaffSchema) {
    mutate(input, { onSuccess: () => setOpen(false) });
  }

  return (
    <ResponsiveDrawer
      open={open}
      setOpen={setOpen}
      title={`${!staff.tin ? "Create a new TIN" : "Update TIN"} for ${
        staff.name
      }`}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="tin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TaxPayer Identification Number</FormLabel>
                <FormControl>
                  <Input placeholder="enter your TIN here " {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <LoadingButton loading={isPending} className="w-full">
            {staff.tin ? "Update TIN" : "Create TIN"}
          </LoadingButton>
        </form>
      </Form>
    </ResponsiveDrawer>
  );
}
