import { Trash } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Button, type ButtonProps } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { deleteUsers } from "~/lib/api/users";
import type { User } from "~/lib/types";
import { cn } from "~/lib/utils";

type UsersTableModalDeleteProps = {
  userIds: User["id"][];
  onCompleteDelete: () => void;
  triggerVariant?: ButtonProps["variant"];
  triggerSize?: ButtonProps["size"];
};

export const UsersTableModalDelete = ({
  userIds,
  onCompleteDelete,
  triggerVariant = "destructive",
  triggerSize = "default",
}: UsersTableModalDeleteProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const selectedCount = userIds?.length || 0;

  React.useEffect(() => {
    const controller = new AbortController();
    return () => controller.abort();
  }, []);

  const onDelete = React.useCallback(async () => {
    setIsDeleting(true);
    try {
      await deleteUsers(userIds);
      toast.success(
        `Successfully deleted ${selectedCount} ${selectedCount === 1 ? "user" : "users"}`
      );
      onCompleteDelete();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to delete users:", error);
      toast.error("Failed to delete users. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }, [onCompleteDelete, userIds, selectedCount]);

  const deleteTitle = `Delete ${selectedCount === 1 ? "user" : `${selectedCount} users`}`;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} size={triggerSize}>
          <Trash
            className={cn(
              triggerVariant === "destructive" ? "" : "text-destructive",
            )}
          />
          {deleteTitle}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{deleteTitle}?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onDelete}
            isLoading={isDeleting}
          >
            {isDeleting ? "Deleting" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
