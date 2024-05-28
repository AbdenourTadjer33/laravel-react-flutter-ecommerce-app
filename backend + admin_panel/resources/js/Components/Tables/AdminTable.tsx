import React from "react";
import { Admin, Pagination } from "@/types";
import { Link, router } from "@inertiajs/react";
import {
    createColumnHelper,
    getCoreRowModel,
    Row,
    useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";

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
import { MdDelete, MdEdit } from "react-icons/md";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
    DialogDescription,
} from "../ui/dialog";
import { FaInfoCircle } from "react-icons/fa";
import DataTable from "../ui/datatable";

const columnHelper = createColumnHelper<Admin>();

const columnDef = [
    columnHelper.accessor("id", {
        header: "id",
    }),
    columnHelper.accessor("name", {
        header: "name",
    }),
    columnHelper.accessor("email", {
        header: "email",
    }),
    columnHelper.accessor("status", {
        header: "status",
        cell: ({ getValue }) => (getValue() ? <>Active</> : <>non-active</>),
    }),
    columnHelper.accessor("createdAt", {
        header: "créer le",
        cell: ({ getValue }) => (
            <>{dayjs(getValue()).format("DD/MM/YYYY HH:mm")}</>
        ),
    }),
    columnHelper.display({
        id: "actions",
        cell: ({ row }) => <Actions row={row} />,
    }),
];

const Actions = ({ row }: { row: Row<Admin> }) => {
    const [beforeDeleteModal, setBeforeDeleteModal] = React.useState(false);

    const deleteAdmin = (id: string) => {
        router.delete(route("admin.admin.destroy", id), {
            preserveScroll: true,
            onSuccess: () => setBeforeDeleteModal(false),
        });
    };

    const activeAdmin = (id: string) => {
        router.post(route("admin.admin.active", id), undefined, {
            preserveScroll: true,
        });
    };

    const disableAdmin = (id: string) => {
        router.post(route("admin.admin.disable", id), undefined, {
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
                    <DropdownMenuItem
                        onClick={() => {
                            row.original.status
                                ? disableAdmin(row.id)
                                : activeAdmin(row.id);
                        }}
                    >
                        {row.original.status ? "Déactiver" : "Activé"}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link
                            href={route("admin.admin.edit", row.id)}
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
                            onClick={() => deleteAdmin(row.id)}
                        >
                            Supprimer
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

const AdminTable = ({ admins }: { admins: Pagination<Admin> }) => {
    const finaleData = React.useMemo(() => admins.data, [admins.data]);
    const finalPagination = React.useMemo(() => {
        return {
            links: admins.links,
            meta: admins.meta,
        };
    }, [admins.meta, admins.links]);
    const finaleColumnDef = React.useMemo(() => columnDef, []);

    const table = useReactTable({
        data: finaleData,
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
                    pagination: finalPagination,
                }}
            />
        </TableWraper>
    );
};

export default AdminTable;