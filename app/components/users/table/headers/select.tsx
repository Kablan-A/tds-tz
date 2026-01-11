import type { Table } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";
import type { User } from "~/lib/types";

type UsersTableHeadersSelectProps = {
  table: Table<User>;
};

export const UsersTableHeadersSelect = ({
  table,
}: UsersTableHeadersSelectProps) => {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  );
};
