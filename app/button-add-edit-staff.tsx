"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { StaffData } from "@/lib/types";
import { useState } from "react";
import FormAddEditStaff from "./form-add-edit-staff";

interface ButtonAddEditStaffProps extends ButtonProps {
  staff?: StaffData;
}

export default function ButtonAddEditStaff({
  staff,
  ...props
}: ButtonAddEditStaffProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        title={!staff ? "Create a new staff" : "Update this staff"}
        onClick={() => setOpen(true)}
        {...props}
      />
      <FormAddEditStaff open={open} setOpen={setOpen} staff={staff} />
    </>
  );
}
