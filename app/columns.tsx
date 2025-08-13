"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { StaffData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import ButtonAddEditTin from "./button-add-edit-tin";
import DropdownMenuStaff from "./drop-down-menu-staff";

export const useStaffColumns: ColumnDef<StaffData>[] = [
  {
    id: "index",
    header({ column }) {
      return (
        <DataTableColumnHeader
          column={column}
          title="#"
          className="text-muted-foreground"
        />
      );
    },
    cell({ row }) {
      return <span className="text-muted-foreground">{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "employeeNumber",
    header({ column }) {
      return (
        <DataTableColumnHeader
          column={column}
          title="Employee number"
          className="hidden md:flex"
        />
      );
    },
    cell({ row }) {
      const staff = row.original;
      const handleClick = () => {
        navigator.clipboard
          .writeText(staff.employeeNumber)
          .then(() => {
            toast.info(`Employee number for ${staff.name} copied to clipboard`);
          })
          .catch((err) => {
            console.error("Failed to copy:", err);
            toast.error(`Could not copy employee number for ${staff.name}`);
          });
      };
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="hidden md:flex" asChild>
              <Button className="" variant={"ghost"} onClick={handleClick}>
                {staff.employeeNumber}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Click here to copy employee number</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "supplierNumber",
    header({ column }) {
      return (
        <DataTableColumnHeader
          column={column}
          title="Supplier number"
          className="hidden md:flex"
        />
      );
    },
    cell({ row }) {
      const staff = row.original;
      const handleClick = () => {
        navigator.clipboard
          .writeText(staff.supplierNumber)
          .then(() => {
            toast.info(`Supplier number for ${staff.name} copied to clipboard`);
          })
          .catch((err) => {
            console.error("Failed to copy:", err);
            toast.error(`Could not copy supplier number for ${staff.name}`);
          });
      };
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="hidden md:flex" asChild>
              <Button className="" variant={"ghost"} onClick={handleClick}>
                {staff.supplierNumber}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Click here to copy supplier number</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "name",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Employee Name" />;
    },
    cell({ row }) {
      const staff = row.original;
      const isMobile = useIsMobile();
      const tin = staff.tin;
      return (
        <div className="*:line-clamp-1 *:text-ellipsis *:max-w-38 *:sm:max-w-fit">
          <p className="flex break-all line-clamp-1 text-ellipsis ">{staff.name}</p>
          {isMobile && (
            <>
              <div
                className='text-muted-foreground text-xs before:content-["Supplier_No:"] before:mr-2 hover:text-foreground hover:cursor-pointer'
                onClick={() => {
                  navigator.clipboard
                    .writeText(staff.supplierNumber)
                    .then(() => {
                      toast.info(
                        `Supplier number for ${staff.name} copied to clipboard`
                      );
                    })
                    .catch((err) => {
                      console.error("Failed to copy:", err);
                      toast.error(
                        `Could not copy supplier number for ${staff.name}`
                      );
                    });
                }}
              >
                {staff.supplierNumber}
              </div>
              <div
                className='text-muted-foreground text-xs  before:content-["IPPS:"] before:mr-2 hover:text-foreground hover:cursor-pointer'
                onClick={() => {
                  navigator.clipboard
                    .writeText(staff.employeeNumber)
                    .then(() => {
                      toast.info(
                        `Employee number for ${staff.name} copied to clipboard`
                      );
                    })
                    .catch((err) => {
                      console.error("Failed to copy:", err);
                      toast.error(
                        `Could not copy employee number for ${staff.name}`
                      );
                    });
                }}
              >
                {staff.employeeNumber}
              </div>
              {!tin ? (
                <div className='text-destructive italic text-xs before:content-["TIN:"] before:mr-2'>
                  --has no TIN--
                </div>
              ) : (
                <div
                  className={cn(
                    'text-muted-foreground text-xs  before:content-["TIN:"] before:mr-2 hover:text-foreground hover:cursor-pointer'
                  )}
                  onClick={() => {
                    navigator.clipboard
                      .writeText(tin)
                      .then(() => {
                        toast.info(`TIN for ${staff.name} copied to clipboard`);
                      })
                      .catch((err) => {
                        console.error("Failed to copy:", err);
                        toast.error(`Could not copy tIN for ${staff.name}`);
                      });
                  }}
                >
                  {tin}
                </div>
              )}
            </>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "tin",
    header({ column }) {
      return (
        <DataTableColumnHeader
          column={column}
          title="TaxPayer Identification Number"
          className="hidden md:flex"
        />
      );
    },
    cell({ row }) {
      const staff = row.original;
      const handleClick = () => {
        navigator.clipboard
          .writeText(staff.tin ?? "")
          .then(() => {
            toast.info(`TIN for ${staff.name} copied to clipboard`);
          })
          .catch((err) => {
            console.error("Failed to copy:", err);
            toast.error(`Could not copy TIN for ${staff.name}`);
          });
      };
      return (
        <TooltipProvider>
          {!staff.tin ? (
            <Badge variant="destructive" className="italic hidden md:flex">
              --No TIN Available--
            </Badge>
          ) : (
            <Tooltip>
              <TooltipTrigger className="hidden md:flex" asChild>
                <Button className="" variant={"ghost"} onClick={handleClick}>
                  {staff.tin}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Click here to copy TIN</TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      );
    },
  },
  {
    id: "action",
    header({ column }) {
      return <DataTableColumnHeader column={column} title="Actions" />;
    },
    cell({ row }) {
      const staff = row.original;
      const hasTin = staff.tin;
      return (
        <>
          {hasTin ? (
            <DropdownMenuStaff staff={staff} />
          ) : (
            <ButtonAddEditTin variant={"default"} size={"icon"} staff={staff}>
              <PlusIcon />
            </ButtonAddEditTin>
          )}
        </>
      );
    },
  },
];
