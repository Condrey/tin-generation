"use client";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  DefinedUseQueryResult,
  QueryObserverLoadingErrorResult,
} from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { HardDriveDownloadIcon, RefreshCcwIcon, SearchIcon, SheetIcon } from "lucide-react";
import * as React from "react";
import { Button } from "../ui/button";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  query: DefinedUseQueryResult | QueryObserverLoadingErrorResult;
  handleClick?: (rowId: string) => void;
  ROWS_PER_TABLE?: number;
  selectedItemId?: string | null;
  filterColumn?: { id: string; label?: string };
  children?: React.ReactNode;
  tableHeaderSection?: React.ReactNode;
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  query,
  ROWS_PER_TABLE = 5,
  selectedItemId,
  handleClick,
  filterColumn,
  children,
  tableHeaderSection,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnFilters, columnVisibility },
  });
  return (
    <div
      className={cn(
        "w-fit max-w-full rounded-md border bg-card p-4 shadow-md",
        className
      )}
    >
      <div className="w-full">{tableHeaderSection}</div>
      {/* filtering , column visibility and children */}
      <div className="flex items-center flex-wrap gap-2 justify-between py-4">
        {!!filterColumn && (
          <div className="relative">
            <SearchIcon className="absolute start-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors peer-focus:text-foreground peer-focus-visible:text-foreground" />
            <Input
              placeholder={`Search by ${
                filterColumn.label ?? filterColumn.id
              }...`}
              value={
                (table
                  .getColumn(filterColumn.id)
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn(filterColumn.id)
                  ?.setFilterValue(event.target.value)
              }
              className="peer max-w-md ps-7"
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <Button
            onClick={() => query.refetch()}
            disabled={query.isFetching}
            title="Refetch data"
            variant="outline"
            size="icon"
          >
            <RefreshCcwIcon
              className={cn(query.isFetching && "animate-spin")}
            />
            <span className="sr-only">Refresh data</span>
          </Button>
         
          {children}
        </div>
      </div>
      <div className="pb-4 md:pb-8">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                const rowItem = row.original as { id: string };
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() =>
                      handleClick ? handleClick(rowItem.id) : undefined
                    }
                    className={cn(
                      !handleClick
                        ? "cursor-default"
                        : "group/row cursor-pointer",
                      rowItem.id === selectedItemId && "bg-muted"
                    )}
                  >
                    {row.getVisibleCells().map((cell, index, array) => (
                      <TableCell key={cell.id} className="w-fit">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* pagination  */}
      <DataTablePagination table={table} ROWS_PER_PAGE={ROWS_PER_TABLE} />
    </div>
  );
}
