"use client"

import * as React from "react"
import {
    // ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import DownloadButton from "./DownloadButton"
import { Row } from "@tanstack/react-table"

// const data: Payment[] = [
//     {
//         id: "m5gr84i9",
//         amount: 316,
//         status: "success",
//         email: "ken99@yahoo.com",
//     },
//     {
//         id: "3u1reuv4",
//         amount: 242,
//         status: "success",
//         email: "Abe45@gmail.com",
//     },
//     {
//         id: "derv1ws0",
//         amount: 837,
//         status: "processing",
//         email: "Monserrat44@gmail.com",
//     },
//     {
//         id: "5kma53ae",
//         amount: 874,
//         status: "success",
//         email: "Silas22@gmail.com",
//     },
//     {
//         id: "bhqecj4p",
//         amount: 721,
//         status: "failed",
//         email: "carmella@hotmail.com",
//     },
// ]

// export interface ListtableProps {
//     id: string
//     nome: string
//     download: string
// }
interface TableInstance {
    getIsAllPageRowsSelected: () => boolean;
    getIsSomePageRowsSelected: () => boolean;
    toggleAllPageRowsSelected: (value: boolean) => void;
}
export type Payment = {
    id: string
    name: string
    caminho: string
    tamanho: number
}

// export const columns: ColumnDef<Payment>[] = [
//     {
//         id: "select",
//         accessorKey: "id",
//         header: ({ table }) => (
//             <Checkbox
//                 checked={
//                     table.getIsAllPageRowsSelected() ||
//                     (table.getIsSomePageRowsSelected() && "indeterminate")
//                 }
//                 onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//                 aria-label="Select all"
//             />
//         ),
//         cell: ({ row }: { row: Row<{ id: string; }> }) => (
//             <Checkbox
//                 checked={row.getIsSelected()}
//                 onCheckedChange={(value) => row.toggleSelected(!!value)}
//                 aria-label="Select row"
//             />
//         ),
//         enableSorting: false,
//         enableHiding: false,
//     },
//     {
//         accessorKey: "name",
//         header: "Name",
//         cell: ({ row }) => (
//             <div className="capitalize">{row.getValue("name")}</div>
//         ),
//     },
//     {
//         accessorKey: "download",
//         header: () => <div className="text-right">Download</div>,
//         cell: ({ row }) => {
//             <DownloadButton fileName={row.getValue("download")} />
//         },
//     },
// ]

export default function TableList({ data }: { data: { id: string; nome: string; caminho: string; tamanho: number }[] }) {

    const columns = [
        {
            id: "select",
            accessorKey: "id",
            header: ({ table }: { table: TableInstance }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }: { row: Row<{ id: string; nome: string; caminho: string; tamanho: number }> }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "nome",
            header: "Nome",
            cell: ({ row }: { row: Row<{ id: string; nome: string; caminho: string; tamanho: number }> }) => (
                <div className="capitalize">{row.getValue("nome")}</div>
            ),
        },
        {
            accessorKey: "caminho",
            header: "Caminho",
            cell: ({ row }: { row: Row<{ id: string; nome: string; caminho: string; tamanho: number }> }) => (
                <div className="capitalize">{row.getValue("caminho")}</div>
            ),
        },
        {
            accessorKey: "tamanho",
            header: "Tamanho",
            cell: ({ row }: { row: Row<{ id: string; nome: string; caminho: string; tamanho: number }> }) => {
                const sizeInBytes: number = row.getValue("tamanho") as number;
                const sizeInKiloBytes = sizeInBytes / 1024;
                const sizeInMegaBytes = sizeInKiloBytes / 1024;
                const sizeInGigaBytes = sizeInMegaBytes / 1024;

                let sizeString = "";

                if (sizeInGigaBytes >= 1) {
                    sizeString = `${sizeInGigaBytes.toFixed(2)} GB`;
                } else if (sizeInMegaBytes >= 1) {
                    sizeString = `${sizeInMegaBytes.toFixed(2)} MB`;
                } else if (sizeInKiloBytes >= 1) {
                    sizeString = `${sizeInKiloBytes.toFixed(2)} KB`;
                } else {
                    sizeString = `${sizeInBytes} bytes`;
                }

                return <div className="capitalize">{sizeString}</div>;
            },
        },
        // {
        //     accessorKey: "download",
        //     header: "Download",
        //     cell: ({ row }: { row: Row<{ id: string; nome: string; caminho: string }> }) => (
        //         <DownloadButton fileNames={selectedFiles} />
        //     ),
        // },

    ];

    // ...


    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    })
    const selectedFiles = table.getFilteredSelectedRowModel().rows.map((row) => row.original.nome);
    const selectedRowcount = table.getFilteredSelectedRowModel().rows.length;
    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <div className="flex items-center justify-center w-full pb-3">
                    <h1 className="font-bold">Lista de arquivos</h1>
                </div>
            </div>
            <div className="rounded-md border">
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
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
            <DownloadButton fileNames={selectedFiles} count={selectedRowcount} />
        </div>
    )
}
