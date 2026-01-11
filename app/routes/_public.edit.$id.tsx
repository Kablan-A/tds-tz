import type { Route } from ".react-router/types/app/routes/+types/_public.edit.$id";
import * as React from "react";
import { UserForm } from "~/components/users/form";
import { createUser } from "~/lib/api/users";
import type { UserFormValues } from "~/lib/schemas/user";
import type { User } from "~/lib/types";
import { formatSkillsetToArray, formatSkillsetToString } from "~/lib/utils";

export async function clientLoader({
  params,
}: Route.LoaderArgs): Promise<User> {
  return {
    id: Number(params.id),
    firstName: "Alice",
    lastName: "Johnson",
    skillset: ["JavaScript", "React", "TypeScript", "Node.js"],
    createdAt: new Date("2023-01-15T10:00:00Z"),
    email: "alice.johnson@example.com",
  };
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function EditUser({ loaderData }: Route.ComponentProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    const controller = new AbortController();
    return () => controller.abort();
  }, []);

  const handleSubmit = React.useCallback(async (data: UserFormValues) => {
    setIsSubmitting(true);
    try {
      const skillset = formatSkillsetToArray(data.skillset);

      await createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        skillset,
      });
    } catch (error) {
      console.error("Failed to create user:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const defaultUserValues: UserFormValues = {
    firstName: loaderData.firstName,
    lastName: loaderData.lastName,
    email: loaderData.email,
    skillset: formatSkillsetToString(loaderData.skillset),
  };

  return (
    <div>
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
