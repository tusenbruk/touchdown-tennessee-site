import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/saturday/six")({
  beforeLoad: () => {
    throw redirect({ to: "/saturday" });
  },
});
