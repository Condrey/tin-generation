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

interface FormAddEditStaffProps {
  staff?: StaffData;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function FormAddEditStaff({
  staff,
  open,
  setOpen,
}: FormAddEditStaffProps) {
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
      title={!staff ? "Create a new staff" : "Update information for staff"}
      description={
        staff
          ? `Updating information for ${staff.name}`
          : "Please fill in the form below to add the new staff"
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of the staff</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Rebecca Gloria Akullo" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="supplierNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supplier Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1187542" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employee Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1802345" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
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
            {staff ? "Update information" : "Create staff"}
          </LoadingButton>
        </form>
      </Form>
    </ResponsiveDrawer>
  );
}
