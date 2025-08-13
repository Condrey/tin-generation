"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StaffData } from "@/lib/types";
import {
  Edit2Icon,
  Edit3Icon,
  MoreVertical,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import DialogDeleteStaff from "./dialog-delete-staff";
import FormAddEditStaff from "./form-add-edit-staff";
import FormAddEditTin from "./form-add-edit-tin";

interface DropdownMenuStaffProps {
  staff: StaffData;
}

export default function DropdownMenuStaff({ staff }: DropdownMenuStaffProps) {
  const hasTin = staff.tin;
  const [openTin, setOpenTin] = useState(false);
  const [openStaff, setOpenStaff] = useState(false);
  const [openStaffDelete, setOpenStaffDelete] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <MoreVertical />
            <span className="sr-only">Open more dialog</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {" "}
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setOpenTin(true)}>
              {hasTin ? <Edit2Icon /> : <PlusIcon />}
              <span>{hasTin ? "Update staff TIN" : "Add staff TIN"}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Secondary actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setOpenStaff(true)}>
              <Edit3Icon />
              <span>Edit staff member</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setOpenStaffDelete(true)}
            >
              <Trash2Icon />
              <span>Delete staff member</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <FormAddEditTin staff={staff} open={openTin} setOpen={setOpenTin} />
      <FormAddEditStaff staff={staff} open={openStaff} setOpen={setOpenStaff} />
      <DialogDeleteStaff
        staff={staff}
        open={openStaffDelete}
        setOpen={setOpenStaffDelete}
      />
    </>
  );
}
