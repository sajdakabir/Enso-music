import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Enso" },
    { name: "description", content: "Welcome to Enso!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Enso</h1>
    </div>
);
}

