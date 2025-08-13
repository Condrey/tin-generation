import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { StaffData } from "@/lib/types";
import { securityKey } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useDeleteStaffMutation } from "./mutation";

interface DialogDeleteStaffProps {
  staff: StaffData;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function DialogDeleteStaff({
  staff,
  open,
  setOpen,
}: DialogDeleteStaffProps) {
  const { isPending, mutate } = useDeleteStaffMutation();
  const schema = z.object({
    permission: z.string().min(1, "Please enter permission code."),
  });
  type Schema = z.infer<typeof schema>;
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    values: { permission: "" },
  });
  function handleSubmit(input: Schema) {
    input.permission === securityKey
      ? mutate(staff.id, { onSuccess: () => setOpen(false) })
      : toast.error(
          "The provided security key is not correct. Please try again!",
        );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-destructive">
            <AlertTriangle className="inline-flex mr-2" />
            Delete information of {staff.name}
          </DialogTitle>
        </DialogHeader>
        <p>
          Please note that this action can not be reversed, proceed with
          caution.
        </p>{" "}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="permission"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="enter security key to proceed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => setOpen(false)}
              >
                Discard
              </Button>
              <LoadingButton
                loading={isPending}
                type={"submit"}
                variant={"destructive"}
              >
                Delete Staff
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
