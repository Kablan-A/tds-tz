import type { Route } from "./+types/_public._index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "TDS TZ" }];
}

export default function Home() {
  return (
    <div>
      <p>Users table</p>
    </div>
  );
}
