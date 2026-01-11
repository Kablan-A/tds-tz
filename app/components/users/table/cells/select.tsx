import type { Row } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";
import type { User } from "~/lib/types";

type UsersTableCellsSelectProps = {
  row: Row<User>;
};

export const UsersTableCellsSelect = ({ row }: UsersTableCellsSelectProps) => {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
};
