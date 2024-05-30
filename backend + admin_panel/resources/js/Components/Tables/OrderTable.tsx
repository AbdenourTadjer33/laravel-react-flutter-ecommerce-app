import { Order, Pagination } from "@/types";
import {
    ColumnDef,
    createColumnHelper,
    getCoreRowModel,
    getExpandedRowModel,
    Row,
    useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { TableWraper } from "../ui/table";
import DataTable from "../ui/datatable";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogDescription,
} from "../ui/dialog";
import {
    MdDelete,
    MdKeyboardArrowDown,
    MdKeyboardArrowRight,
} from "react-icons/md";
import { currencyFormat } from "@/Lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import { FaInfoCircle } from "react-icons/fa";
import { columnDef as productColumnDef } from "./ProductTable";

const columnHelper = createColumnHelper<Order>();

const columnDef = [
    columnHelper.accessor("ref", {
        header: "referance",
    }),

    columnHelper.display({
        id: "expander",
        cell: ({ row }) =>
            row.getCanExpand() ? (
                <Button
                    variant="ghost"
                    onClick={row.getToggleExpandedHandler()}
                >
                    {row.getIsExpanded() ? (
                        <MdKeyboardArrowDown className="h-5 w-5" />
                    ) : (
                        <MdKeyboardArrowRight className="h-5 w-5" />
                    )}
                </Button>
            ) : null,
    }),

    columnHelper.accessor("client.name", {
        header: "client",
    }),

    columnHelper.accessor("client.email", {
        header: "e-mail",
    }),

    columnHelper.accessor("client.phone", {
        header: "n° tél",
    }),

    columnHelper.accessor("client.address", {
        header: "adresse ",
    }),

    columnHelper.accessor("total", {
        header: "total",
        // @ts-ignore
        cell: ({ getValue }) => <>{currencyFormat(getValue())}</>,
    }),

    columnHelper.accessor("status", {
        header: "status",
    }),

    columnHelper.accessor("createdAt", {
        header: "commande le",
        cell: ({ getValue }) => {
            return <>{dayjs(getValue()).format("DD/MM/YYYY H:mm")}</>;
        },
    }),

    columnHelper.display({
        id: "actions",
        cell: ({ row }) => <Actions row={row} />,
    }),
];

const Actions = ({ row }: { row: Row<Order> }) => {
    const order = row.original;
    const [beforeDeleteModal, setBeforeDeleteModal] = React.useState(false);

    const deleteOrder = (ref: string) => {
        router.delete(route("admin.order.destroy", ref), {
            preserveScroll: true,
            onSuccess: () => setBeforeDeleteModal(false),
        });
    };

    const confirmOrder = (ref: string) => {
        router.post(route("admin.order.confirm", ref), undefined, {
            preserveScroll: true,
        });
    };

    const cancelOrder = (ref: string) => {
        router.post(route("admin.order.cancel", ref), undefined, {
            preserveScroll: true,
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
                    {order.status === "nouvelle commande" && (
                        <>
                            <DropdownMenuLabel>
                                Êtat de la commande
                            </DropdownMenuLabel>

                            <DropdownMenuItem
                                onClick={() => confirmOrder(row.id)}
                            >
                                Confirmé la commande
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => cancelOrder(row.id)}
                            >
                                Annuler la commande
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                        </>
                    )}

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
                            onClick={() => deleteOrder(row.id)}
                        >
                            Supprimer
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

const OrderTable = ({ orders }: { orders: Pagination<Order> }) => {
    const finalData = React.useMemo(() => orders.data, [orders.data]);
    const finalPagination = React.useMemo(() => {
        return { links: orders.links, meta: orders.meta };
    }, [orders.links, orders.meta]);
    const finalColumnDef = React.useMemo(() => columnDef, []);

    const table = useReactTable({
        data: finalData,
        columns: finalColumnDef,
        getCoreRowModel: getCoreRowModel(),
        getRowId: (row) => row.ref,
        getRowCanExpand: () => true,
        getExpandedRowModel: getExpandedRowModel(),
        manualPagination: true,
    });

    const subComponent = ({ row }: { row: Row<Order> }) => {
        const order = row.original;

        return (
            <div className="flex flex-wrap gap-2 max-w-2xl ">
                <ul className="flex-col border p-2 ">
                    <li className="grid grid-cols-4 py-2 border-b space-x-4">
                        <span>Produit</span>
                        <span>Prix</span>
                        <span>Quantité</span>
                        <span>Total</span>
                    </li>
                    {order.products.map((product) => {
                        return (
                            <li
                                key={product.id}
                                className="grid grid-cols-4 gap-4 py-2 border-b"
                            >
                                <span>{product.name}</span>
                                <span>{currencyFormat(product.price)}</span>
                                <span>{product.qte} pcs</span>
                                <span>{currencyFormat(product.total)}</span>
                            </li>
                        );
                    })}
                    <li className="grid grid-cols-4 gap-4 py-2">
                        <span></span>
                        <span></span>
                        <span>Total :</span>
                        <span>{currencyFormat(order.total)}</span>
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <TableWraper>
            <div className="p-4"></div>
            <DataTable
                options={{
                    table,
                    pagination: finalPagination,
                    subComponent,
                }}
            />
        </TableWraper>
    );
};

export default OrderTable;
