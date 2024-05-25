import React from "react";
import { Pagination, Product } from "@/types";
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
import { Indicator } from "../ui/indicator";

const columnHelper = createColumnHelper<Product>();

const columnDef = [
    columnHelper.accessor("id", {
        header: "id",
    }),

    columnHelper.accessor("name", {
        header: "produit",
    }),

    columnHelper.accessor("description", {
        header: "description",
        cell: ({ getValue }) => <p className="truncate">{getValue()}</p>,
    }),

    columnHelper.accessor("sizes", {
        header: "pointeur disponible",
    }),

    columnHelper.accessor("status", {
        header: "status",
        cell: ({ getValue }) => <Indicator color={getValue()} />,
    }),

    columnHelper.accessor("brand", {
        header: "brand",
        cell: ({ getValue }) => <>{getValue() ? getValue() : null}</>,
    }),

    columnHelper.accessor("price", {
        header: "prix",
        cell: ({ getValue }) => <>{getValue() + "DA"}</>,
    }),

    columnHelper.display({
        id: "actions",
        cell: ({ row }) => <Actions row={row} />,
    }),
];

const Actions = ({ row }: { row: Row<Product> }) => {
    const [beforeDeleteModal, setBeforeDeleteModal] = React.useState(false);

    const deleteProduct = (id: string) => {
        router.delete(route("admin.product.destroy", id), {
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
                    <DropdownMenuItem>
                        {row.original.status ? "Déactiver" : "Activé"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link
                            href={route("admin.product.edit", row.id)}
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

const ProductTable = ({ products }: { products: Pagination<Product> }) => {
    const finalData = React.useMemo(() => products.data, [products.data]);
    const finaleColumnDef = React.useMemo(() => columnDef, []);

    const table = useReactTable({
        data: finalData,
        columns: finaleColumnDef,
        getCoreRowModel: getCoreRowModel(),
        getRowId: (row) => row.slug,
        manualPagination: true,
    });
    return (
        <TableWraper>
            <div className="p-4"></div>
            <DataTable
                options={{
                    table,
                    pagination: {
                        links: products.links,
                        meta: products.meta,
                    },
                }}
            />
            id
        </TableWraper>
    );
};

export default ProductTable;
