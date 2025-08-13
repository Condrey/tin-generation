import ResponsiveDrawer from "@/components/responsive-drawer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StaffData } from "@/lib/types";
import { staffSchema, StaffSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DialogUpsertStaff from "./dialog-upsert-staff";

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
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<StaffSchema>({
    resolver: zodResolver(staffSchema),
    values: {
      id: staff?.id || 0,
      employeeNumber: staff?.employeeNumber || "",
      supplierNumber: staff?.supplierNumber || "",
      tin: staff?.tin || "",
      name: staff?.name || "",
    },
  });

  function onSubmit(input: StaffSchema) {
    setOpen(false)
    setOpenDialog(true);
  }

  return (
    <>
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
                    <Input
                      placeholder="e.g., Rebecca Gloria Akullo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">
              {staff ? "Update information" : "Create staff"}
            </Button>
          </form>
        </Form>
      </ResponsiveDrawer>
      <DialogUpsertStaff
        formInput={form.watch()}
        open={openDialog}
        setOpen={setOpenDialog}
        setOpenForm={setOpen}
      />
    </>
  );
}
