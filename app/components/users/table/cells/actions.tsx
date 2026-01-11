import type { Row } from "@tanstack/react-table";
import { Edit, MoreHorizontal } from "lucide-react";
import { Link, useRevalidator } from "react-router";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { UsersTableModalDelete } from "~/components/users/table/modal/delete";
import type { User } from "~/lib/types";

type UsersTableCellsActionsProps = {
  row: Row<User>;
};

export const UsersTableCellsActions = ({
  row,
}: UsersTableCellsActionsProps) => {
  const revalidator = useRevalidator();
  const user = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start hover:border-0"
          >
            <Link to={`/edit/${user.id}`}>
              <Edit className="text-primary" /> Edit user
            </Link>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <UsersTableModalDelete
            userIds={[user.id]}
            onCompleteDelete={() => revalidator.revalidate()}
            triggerVariant="ghost"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
