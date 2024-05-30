import React from "react";
import { Brand, Pagination } from "@/types";
import {
    createColumnHelper,
    getCoreRowModel,
    Row,
    useReactTable,
} from "@tanstack/react-table";
import DataTable from "../ui/datatable";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { TableWraper } from "../ui/table";
import { Link, router } from "@inertiajs/react";
import { MdDelete, MdEdit } from "react-icons/md";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogDescription,
} from "../ui/dialog";
import { FaInfoCircle } from "react-icons/fa";
import dayjs from "dayjs";

const columnHelper = createColumnHelper<Brand>();

const columnDef = [
    columnHelper.accessor("id", {
        header: "id",
    }),

    columnHelper.accessor("name", {
        header: "brand",
    }),

    columnHelper.accessor("count", {
        header: "nb produit",
    }),

    columnHelper.accessor("createdAt", {
        header: "créer le",
        cell: ({ getValue }) => {
            return <>{dayjs(getValue()).format("DD/MM/YYYY H:mm")}</>;
        },
    }),

    columnHelper.display({
        id: "actions",
        cell: ({ row }) => <Actions row={row} />,
    }),
];

const Actions = ({ row }: { row: Row<Brand> }) => {
    const [beforeDeleteModal, setBeforeDeleteModal] = React.useState(false);

    const deleteProduct = (id: string) => {
        router.delete(route("admin.brand.destroy", id), {
            preserveScroll: true,
            onSuccess: () => setBeforeDeleteModal(false),
        });
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                        <Link
                            href={route("admin.brand.edit", row.id)}
                            className="flex items-center gap-2"
                        >
                            <MdEdit className="w-4 h-4" />
                            Modifier
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => setBeforeDeleteModal(true)}
                        className="flex items-center gap-2"
                    >
                        <MdDelete className="w-4 h-4" />
                        Suprimer
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog
                open={beforeDeleteModal}
                onOpenChange={setBeforeDeleteModal}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="inline-flex items-center gap-2">
                            <FaInfoCircle className="w-6 h-6 text-red-500 dark:text-red-600" />
                            Etes-vous absolument sùr?
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Cette action ne peut pas être annulée. Cela sera
                        définitivement supprimez cette unité.
                    </DialogDescription>
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setBeforeDeleteModal(false)}
                        >
                            Annuler
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => deleteProduct(row.id)}
                        >
                            Supprimer
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

const BrandTable = ({ brands }: { brands: Pagination<Brand> }) => {
    const finalData = React.useMemo(() => brands.data, [brands.data]);
    const finaleColumnDef = React.useMemo(() => columnDef, []);

    const table = useReactTable({
        data: finalData,
        columns: finaleColumnDef,
        getCoreRowModel: getCoreRowModel(),
        getRowId: (row) => row.id,
        manualPagination: true,
    });
    return (
        <TableWraper>
            <div className="p-4"></div>

            <DataTable
                options={{
                    table,
                    pagination: {
                        links: brands.links,
                        meta: brands.meta,
                    },
                }}
            />
        </TableWraper>
    );
};

export default BrandTable;
