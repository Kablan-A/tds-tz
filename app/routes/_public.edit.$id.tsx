import type { Route } from ".react-router/types/app/routes/+types/_public.edit.$id";
import * as React from "react";
import { toast } from "sonner";
import { BackButton } from "~/components/shared/back-button";
import { UserForm } from "~/components/users/form";
import { fetchUserById, updateUser } from "~/lib/api/users";
import type { UserFormValues } from "~/lib/schemas/user";
import type { User } from "~/lib/types";
import { formatSkillsetToArray, formatSkillsetToString } from "~/lib/utils";

export async function clientLoader({
  params,
}: Route.LoaderArgs): Promise<User> {
  try {
    return await fetchUserById(Number(params.id));
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return {
      id: Number(params.id),
      firstName: "Unknown",
      lastName: "User",
      skillset: [],
      createdAt: new Date(),
      email: "unknown@example.com",
    };
  }
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function EditUser({ loaderData }: Route.ComponentProps) {
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

        await updateUser(loaderData.id, {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          skillset,
        });

        toast.success("User updated successfully!");
      } catch (error) {
        console.error("Failed to update user:", error);
        toast.error("Failed to update user. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [loaderData.id],
  );

  const defaultUserValues: UserFormValues = {
    firstName: loaderData.firstName,
    lastName: loaderData.lastName,
    email: loaderData.email,
    skillset: formatSkillsetToString(loaderData.skillset),
  };

  return (
    <div>
      <BackButton />
      <section>
        <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      </section>

      <UserForm
        type="update"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        defaultValues={defaultUserValues}
      />
    </div>
  );
}
