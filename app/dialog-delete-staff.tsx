import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/ui/loading-button";
import { StaffData } from "@/lib/types";
import { useDeleteStaffMutation } from "./mutation";
import { AlertTriangle } from "lucide-react";

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

  function onSubmit() {
    mutate(staff.id, { onSuccess: () => setOpen(false) });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
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
        <DialogFooter>
          <Button variant={"secondary"} onClick={() => setOpen(false)}>
            Discard
          </Button>
          <LoadingButton
            loading={isPending}
            onClick={onSubmit}
            variant={"destructive"}
          >
            Delete Staff
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
