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
import { securityKey } from "@/lib/utils";
import { StaffSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useUpsertStaffMutation } from "./mutation";

interface DialogUpsertStaffProps {
  formInput: StaffSchema;
  open: boolean;
  setOpen: (open: boolean) => void;
  setOpenForm: (openForm: boolean) => void;
}

export default function DialogUpsertStaff({
  formInput,
  open,
  setOpen,
  setOpenForm,
}: DialogUpsertStaffProps) {
  const { isPending, mutate } = useUpsertStaffMutation();
  const schema = z.object({
    permission: z.string().min(1, "Please enter permission code."),
  });
  type Schema = z.infer<typeof schema>;
  const form2 = useForm<Schema>({
    resolver: zodResolver(schema),
    values: { permission: "" },
  });
  function handleSubmit(input: Schema) {
    input.permission === securityKey
      ? mutate(formInput, {
          onSuccess: () => {
            setOpen(false);
            setOpenForm(false);
          },
        })
      : toast.error(
          "The provided security key is not correct. Please try again!",
        );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="">
            <InfoCircledIcon className="inline-flex mr-2" />
            Confirm Security code
          </DialogTitle>
        </DialogHeader>

        <Form {...form2}>
          <form
            onSubmit={form2.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form2.control}
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
                onClick={() => {
                  setOpen(false);
                  setOpenForm(true);
                }}
              >
                Discard
              </Button>
              <LoadingButton
                loading={isPending}
                type={"button"}
                onClick={() => form2.handleSubmit(handleSubmit)()}
              >
                Confirm
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
