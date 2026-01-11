import type { Route } from ".react-router/types/app/routes/+types/_public._index";
import { useRevalidator } from "react-router";
import { DataTable } from "~/components/shared/data-table";
import { UsersTableBulkDelete } from "~/components/users/bulk-delete";
import { USERS_TABLE_COLUMNS } from "~/components/users/table/columns";
import { UsersTableModalAdd } from "~/components/users/table/modal/add";
import type { User } from "~/lib/types";

export async function clientLoader(): Promise<User[]> {
  return [
    {
      id: 1,
      firstName: "Alice",
      lastName: "Johnson",
      skillset: ["JavaScript", "React", "TypeScript", "Node.js"],
      createdAt: new Date("2023-01-15T10:00:00Z"),
      email: "alice.johnson@example.com",
    },
    {
      id: 2,
      firstName: "Bob",
      lastName: "Davidson",
      skillset: ["JavaScript", "React"],
      createdAt: new Date("2022-01-15T10:00:00Z"),
      email: "alice.johnson@example.com",
    },
  ];
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const revalidator = useRevalidator();

  return (
    <section>
      <DataTable
        columns={USERS_TABLE_COLUMNS}
        data={loaderData}
        bulkActions={(table) => (
          <UsersTableBulkDelete
            table={table}
            onDeleteComplete={() => revalidator.revalidate()}
          />
        )}
        addAction={
          <UsersTableModalAdd onComplete={() => revalidator.revalidate()} />
        }
      />
    </section>
  );
}
