"use client";

import { DataTable } from "@/components/data-table/data-table";
import EmptyContainer from "@/components/query-containers/empty-container";
import ErrorContainer from "@/components/query-containers/error-container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StaffData } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import {
  HardDriveDownloadIcon,
  PlusIcon,
  UserCheck2Icon,
  UserRoundXIcon,
  Users2Icon,
} from "lucide-react";
import * as XLSX from "xlsx";
import { getAllStaffs } from "./action";
import ButtonAddEditStaff from "./button-add-edit-staff";
import { useStaffColumns } from "./columns";

interface ListOfStaffsProps {
  staffs: StaffData[];
}

export default function ListOfStaffs({ staffs }: ListOfStaffsProps) {
  const query = useQuery({
    queryKey: ["all-staffs"],
    queryFn: getAllStaffs,
    initialData: staffs,
    refetchInterval: 5000,
  });

  const { status, data, error } = query;
  if (status === "error") {
    console.error(error);
    return (
      <ErrorContainer
        errorMessage="Failed to get a list of the staffs, please try again.!"
        query={query}
      />
    );
  }
  if (status === "success" && !data.length) {
    return (
      <EmptyContainer message="There are no staffs added in the system yet please add.">
        <ButtonAddEditStaff variant="secondary">
          Add new staff
        </ButtonAddEditStaff>
      </EmptyContainer>
    );
  }
  const remainingStaffs = data.filter((d) => !d.tin);
  const completedStaffs = data.filter((d) => !!d.tin);

  return (
    <Tabs defaultValue="all">
      <TabsList className="w-full *:flex-1 *:py-3">
        <TabsTrigger value="all">
          <Users2Icon className="hidden sm:flex" />
          All Staffs <span className="hidden sm:flex">({data.length})</span>
        </TabsTrigger>
        <TabsTrigger value="remaining">
          <UserRoundXIcon className="text-destructive hidden sm:flex" />
          Remaining{" "}
          <span className="hidden sm:flex">({remainingStaffs.length})</span>
        </TabsTrigger>
        <TabsTrigger value="completed">
          <UserCheck2Icon className="text-green-500 hidden sm:flex dark:text-green-700" />
          Completed{" "}
          <span className="hidden sm:flex">({completedStaffs.length})</span>
        </TabsTrigger>
      </TabsList>
      <span className="text-xs my-1.5 text-muted-foreground italic text-center max-w-sm w-full mx-auto">
        Choose a category from the tab above e.g., All Staffs
      </span>
      <TabsContent value="all">
        <DataTable
          data={data}
          columns={useStaffColumns}
          query={query}
          filterColumn={{ id: "name" }}
          tableHeaderSection={
            <h1 className="md:text-xl capitalize font-semibold tracking-tight">
              List of all affected staffs
            </h1>
          }
          className="md:w-full max-w-5xl mx-auto"
        >
          <Button
            title="Download as Excel"
            variant="secondary"
            size="icon"
            onClick={() => {
              const formattedData = data.map((d) => ({
                Employee: d.employeeNumber,
                "Supplier Number": d.supplierNumber,
                "Employee Name": d.name,
                "TIN NUMBER": d.tin,
              }));
              const workSheet = XLSX.utils.json_to_sheet(formattedData);
              const workBook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(workBook, workSheet, "All Staffs");
              XLSX.writeFile(
                workBook,
                "all-staffs" + "-" + Date.now() + ".xlsx"
              );
            }}
          >
            <HardDriveDownloadIcon />
            <span className="sr-only">download as Excel</span>
          </Button>
          <ButtonAddEditStaff variant="outline" size="icon">
            <PlusIcon />
            <span className="sr-only">Add a new staff</span>
          </ButtonAddEditStaff>
        </DataTable>
      </TabsContent>
      <TabsContent value="remaining">
        <DataTable
          data={remainingStaffs}
          columns={useStaffColumns}
          query={query}
          filterColumn={{ id: "name" }}
          tableHeaderSection={
            <h1 className="md:text-xl text-destructive capitalize font-semibold tracking-tight">
              List of staffs without TINs
            </h1>
          }
          className="md:w-full max-w-5xl mx-auto"
        >
          <Button
            title="Download as Excel"
            variant="secondary"
            size="icon"
            onClick={() => {
              const formattedData = remainingStaffs.map((d) => ({
                Employee: d.employeeNumber,
                "Supplier Number": d.supplierNumber,
                "Employee Name": d.name,
                "TIN NUMBER": d.tin,
              }));
              const workSheet = XLSX.utils.json_to_sheet(formattedData);
              const workBook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(
                workBook,
                workSheet,
                "Remaining Staffs"
              );
              XLSX.writeFile(
                workBook,
                "remaining-staffs" + "-" + Date.now() + ".xlsx"
              );
            }}
          >
            <HardDriveDownloadIcon />
            <span className="sr-only">download as Excel</span>
          </Button>
          <ButtonAddEditStaff variant="default" size="icon">
            <PlusIcon />
          </ButtonAddEditStaff>
        </DataTable>
      </TabsContent>
      <TabsContent value="completed">
        <DataTable
          data={completedStaffs}
          columns={useStaffColumns}
          query={query}
          filterColumn={{ id: "name" }}
          tableHeaderSection={
            <h1 className="md:text-xl text-green-500 dark:text-green-700 capitalize font-semibold tracking-tight">
              List of staffs with TINs
            </h1>
          }
          className="md:w-full max-w-5xl mx-auto"
        >
          <Button
            title="Download as Excel"
            variant="secondary"
            size="icon"
            onClick={() => {
              const formattedData = completedStaffs.map((d) => ({
                Employee: d.employeeNumber,
                "Supplier Number": d.supplierNumber,
                "Employee Name": d.name,
                "TIN NUMBER": d.tin,
              }));
              const workSheet = XLSX.utils.json_to_sheet(formattedData);
              const workBook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(
                workBook,
                workSheet,
                "Completed Staffs"
              );
              XLSX.writeFile(
                workBook,
                "completed-staffs" + "-" + Date.now() + ".xlsx"
              );
            }}
          >
            <HardDriveDownloadIcon />
            <span className="sr-only">download as Excel</span>
          </Button>
          <ButtonAddEditStaff variant="default" size="icon">
            <PlusIcon />
          </ButtonAddEditStaff>
        </DataTable>
      </TabsContent>
    </Tabs>
  );
}
