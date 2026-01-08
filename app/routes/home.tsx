import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [{ title: "TDS TZ" }];
}

export default function Home() {
  return <Welcome />;
}
