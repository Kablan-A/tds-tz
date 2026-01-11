import { Plus } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { UserForm } from "~/components/users/form";
import { createUser } from "~/lib/api/users";
import type { UserFormValues } from "~/lib/schemas/user";
import { formatSkillsetToArray } from "~/lib/utils";

type UsersTableModalAddProps = {
  onComplete?: () => void;
};

export const UsersTableModalAdd = ({ onComplete }: UsersTableModalAddProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    const controller = new AbortController();
    return () => controller.abort();
  }, []);

  const handleSubmit = React.useCallback(
    async (data: UserFormValues) => {
      setIsSubmitting(true);
      try {
        const skillset = formatSkillsetToArray(data.skillset);

        await createUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          skillset,
        });

        toast.success("User created successfully!");
        setIsOpen(false);
        onComplete?.();
      } catch (error) {
        console.error("Failed to create user:", error);
        toast.error("Failed to create user. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [onComplete],
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Fill in the information to create a new user account.
          </DialogDescription>
        </DialogHeader>
        <UserForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  );
};
