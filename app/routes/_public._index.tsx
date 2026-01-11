import type { Route } from ".react-router/types/app/routes/+types/_public._index";
import { useRevalidator } from "react-router";
import { DataTable } from "~/components/shared/data-table";
import { UsersTableBulkDelete } from "~/components/users/bulk-delete";
import { USERS_TABLE_COLUMNS } from "~/components/users/table/columns";
import { UsersTableModalAdd } from "~/components/users/table/modal/add";
import { fetchAllUsers } from "~/lib/api/users";
import type { User } from "~/lib/types";

export async function clientLoader(): Promise<User[]> {
  try {
    return await fetchAllUsers({ limit: 30, skip: 0 });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
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
