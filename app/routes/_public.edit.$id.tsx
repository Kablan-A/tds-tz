import type { Route } from ".react-router/types/app/routes/+types/_public.edit.$id";
import type { User } from "~/lib/types";

export async function clientLoader(): Promise<User> {
  return {
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
    skillSet: ["JavaScript", "React", "TypeScript", "Node.js"],
    createdAt: new Date("2023-01-15T10:00:00Z"),
    email: "alice.johnson@example.com",
  };
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function EditUser({ loaderData }: Route.ComponentProps) {
  return (
    <div className="py-10">
      {loaderData.firstName} {loaderData.lastName} - Edit User Page
    </div>
  );
}
