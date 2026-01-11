import type { ColumnDef } from "@tanstack/react-table";
import { DataTableHeader } from "~/components/shared/data-table/header";
import { UsersTableCellsActions } from "~/components/users/table/cells/actions";
import { UsersTableCellsSelect } from "~/components/users/table/cells/select";
import { UsersTableCellsSkillset } from "~/components/users/table/cells/skillset";
import { UsersTableHeadersSelect } from "~/components/users/table/headers/select";
import type { User } from "~/lib/types";

export const USERS_TABLE_COLUMNS: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => <UsersTableHeadersSelect table={table} />,
    cell: ({ row }) => <UsersTableCellsSelect row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableHeader column={column} title="Id" />,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableHeader column={column} title="First Name" />
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: "skillSet",
    header: "Skills",
    cell: ({ row }) => <UsersTableCellsSkillset row={row} />,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableHeader column={column} title="Created At" />
    ),
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <UsersTableCellsActions row={row} />,
    enableHiding: false,
  },
];
