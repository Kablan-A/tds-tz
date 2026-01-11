import { UsersTableModalDelete } from "./table/modal/delete";
import type { Table } from "@tanstack/react-table";
import type { User } from "~/lib/types";

type UsersTableBulkDeleteProps = {
  table: Table<User>;
  onDeleteComplete?: () => void;
};

export const UsersTableBulkDelete = ({
  table,
  onDeleteComplete,
}: UsersTableBulkDeleteProps) => {
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  if (selectedCount === 0) {
    return null;
  }

  return (
    <UsersTableModalDelete
      userIds={selectedRows.map((row) => row.original.id)}
      onCompleteDelete={() => {
        table.resetRowSelection();
        onDeleteComplete?.();
      }}
      triggerVariant="destructive"
      triggerSize="sm"
    />
  );
};
