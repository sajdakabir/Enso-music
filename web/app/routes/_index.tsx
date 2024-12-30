import type { MetaFunction } from "@remix-run/node";
import Login from "../ui/auth/login";

export const meta: MetaFunction = () => {
  return [
    { title: "Enso" },
    { name: "description", content: "Welcome to Enso!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Login />
    </div>
  );
}

