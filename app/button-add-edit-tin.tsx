"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { StaffData } from "@/lib/types";
import { useState } from "react";
import FormAddEditTin from "./form-add-edit-tin";

interface ButtonAddEditTinProps extends ButtonProps {
  staff: StaffData;
}

export default function ButtonAddEditTin({
  staff,
  ...props
}: ButtonAddEditTinProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        title={`${staff.tin?'Update the TIN':'Add TIN'} for ${staff.name}`}
        onClick={() => setOpen(true)}
        {...props}
      />
      <FormAddEditTin open={open} setOpen={setOpen} staff={staff} />
    </>
  );
}
